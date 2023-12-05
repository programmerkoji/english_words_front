/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useState } from "react";
import Word from "./Word";
import { useAllWords } from "../hooks/useAllWords";
import axios, { AxiosResponse } from "axios";
import { WordResponseApi } from "../types/word";
import { Create } from "./Create";
import { Pagination } from "@mui/material";

const Main = () => {
	const { fetchPost, wordsData } = useAllWords();
	const [page, setPage] = useState(1);
	const [formData, setFormData] = useState({
		user_id: 1,
		word_en: "",
		word_ja: "",
		part_of_speech: 0,
		memory: 0,
		memo: "",
	});

	const handleChangePage = (
		event: React.ChangeEvent<unknown>,
		newPage: number
	) => {
		setPage(newPage);
		fetchPost(newPage);
	};

	const handleCreateSubmit = async () => {
		try {
			const response: AxiosResponse = await axios.post("/words", formData);
			console.log(response);
		} catch (error) {}
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleDelete = async (word_id: number) => {
		try {
			await axios.delete<WordResponseApi>(`/words/${word_id}`);
			fetchPost(page);
		} catch (error) {}
	};

	useEffect(() => {
		fetchPost(page);
	}, [page]);

	return (
		<main>
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
						<div className="p-6 bg-white border-b border-gray-200">
							<div className="text-gray-600 body-font">
								<div className="mb-4"></div>
								<div className="mb-6 flex items-center flex-wrap gap-4">
									<Create formData={formData} handleCreateSubmit={handleCreateSubmit} handleInputChange={handleInputChange} />
									<div className="md:ml-auto flex justify-end gap-2">
										<select name="memory_search" id="memory_search">
											<option value="">記憶度</option>
											<option value="1">○</option>
											<option value="2">△</option>
											<option value="3">☓</option>
										</select>
										<select name="sort" id="sort">
											<option value="1">新しい順</option>
											<option value="2">古い順</option>
										</select>
									</div>
								</div>

								<div className="container mx-auto">
									<ul className="flex flex-wrap -m-2">
										{wordsData.data.map((word) => (
											<Word
												key={word.id}
												word_id={word.id}
												word_en={word.word_en}
												word_ja={word.word_ja}
												part_of_speech={word.part_of_speech}
												memory={word.memory}
												memo={word.memo}
												created_at={word.created_at}
												onDelete={handleDelete}
											/>
										))}
									</ul>
								</div>
							</div>
							<div className="mt-4 flex justify-center">
								<Pagination
									count={wordsData.last_page}
									page={page}
									onChange={handleChangePage}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Main;
