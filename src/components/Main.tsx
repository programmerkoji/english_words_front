/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Word from "./Word";
import { useAllWords } from "../hooks/useAllWords";
import { Pagination } from "@mui/material";

const Main = () => {
	const { getWords, wordsData } = useAllWords();
	const [page, setPage] = React.useState(1);

	const handleChangePage = (
		event: React.ChangeEvent<unknown>,
		newPage: number
	) => {
		setPage(newPage);
		getWords(newPage);
	};

	useEffect(() => getWords(page), [page]);

	return (
		<main>
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
						<div className="p-6 bg-white border-b border-gray-200">
							<div className="text-gray-600 body-font">
								<div className="mb-4"></div>
								<div className="mb-6 flex items-center flex-wrap gap-4">
									<span className="inline-block text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
										単語を登録
									</span>
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
												word_en={word.word_en}
												created_at={word.created_at}
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
