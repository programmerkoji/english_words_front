/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Word from "./Word";
import { useAllWords } from "../hooks/useAllWords";
import {
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Pagination,
	TextField,
} from "@mui/material";
import axios from "axios";
import { WordResponseApi } from "../types/word";

const Main = () => {
	const { getWords, wordsData } = useAllWords();
	const [page, setPage] = useState(1);
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleChangePage = (
		event: React.ChangeEvent<unknown>,
		newPage: number
	) => {
		setPage(newPage);
		getWords(newPage);
	};

	const handleDelete = async (word_id: number) => {
		try {
			await axios.delete<WordResponseApi>(`/words/${word_id}`);
			getWords(page);
		} catch (error) {}
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
									<button
										onClick={handleOpen}
										className="inline-block text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
									>
										単語を登録
									</button>
									<Dialog open={open} onClose={handleClose}>
										<DialogTitle>新規登録</DialogTitle>
										<DialogContent>
											<DialogContentText>
												To subscribe to this website, please enter your email
												address here. We will send updates occasionally.
											</DialogContentText>
											<TextField
												autoFocus
												margin="dense"
												id="word_en"
												label="英単語"
												type="text"
												fullWidth
												variant="standard"
											/>
											<TextField
												autoFocus
												margin="dense"
												id="word_ja"
												label="日本語訳"
												type="text"
												fullWidth
												variant="standard"
											/>
										</DialogContent>
									</Dialog>
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
