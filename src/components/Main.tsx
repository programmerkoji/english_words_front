/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useState } from "react";
import Word from "./Word";
import { useAllWords } from "../hooks/useAllWords";
import axios, { AxiosResponse } from "axios";
import { WordResponseApi } from "../types/word";
import { Create } from "./Create";
import { Alert, Pagination, Snackbar, SnackbarOrigin } from "@mui/material";

interface State extends SnackbarOrigin {
	open: boolean;
}

type responseData = {
	status: number;
	data: {message: string};
}

const Main = () => {
	const { fetchPost, wordsData } = useAllWords();
	const initialFormData = {
		user_id: 1,
		word_en: "",
		word_ja: "",
		part_of_speech: 0,
		memory: 0,
		memo: "",
	};
	const [formData, setFormData] = useState(initialFormData);
	const [message, setMessage] = useState("");
	const [state, setState] = React.useState<State>({
		open: false,
		vertical: "top",
		horizontal: "center",
	});
	const { vertical, horizontal, open } = state;

	const getPageNumberFromSession = (): number => {
		const pageNumber = sessionStorage.getItem('currentPage');
		return pageNumber ? parseInt(pageNumber, 10) : 1;
	}
	const [page, setPage] = useState(getPageNumberFromSession());

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}
		setState({ ...state, open: false });
	};

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
			if (response.status === 200) {
				const responseData = response.data;
				setState({ ...state, open: true });
				setMessage(responseData.message);
			}
			setFormData(initialFormData);
			fetchPost(page);
		} catch (error) {}
	};

	const onUpdateSuccess = (response: responseData) => {
		if (response.status === 200) {
			const responseData = response.data;
			setState({ ...state, open: true });
			setMessage(responseData.message);
		}
		fetchPost(page);
	};

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleDelete = async (word_id: number) => {
		try {
			await axios.delete<WordResponseApi>(`/words/${word_id}`);
			fetchPost(page);
		} catch (error) {}
	};

	useEffect(() => {
		sessionStorage.setItem('currentPage', page.toString());
		fetchPost(page);
	}, [page]);

	return (
		<main>
			<Snackbar
				anchorOrigin={{ vertical, horizontal }}
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
				message={message}
				key={vertical + horizontal}
			>
				<Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
					{message}
				</Alert>
			</Snackbar>
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
						<div className="p-6 bg-white border-b border-gray-200">
							<div className="text-gray-600 body-font">
								<div className="mb-4"></div>
								<div className="mb-6 flex items-center flex-wrap gap-4">
									<Create
										formData={formData}
										handleCreateSubmit={handleCreateSubmit}
										handleInputChange={handleInputChange}
									/>
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
												onUpdateSuccess={onUpdateSuccess}
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
