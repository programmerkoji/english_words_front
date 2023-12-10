/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState } from "react";
import { WordResponseApi } from "../types/word";

export const useAllWords = () => {
	const [wordsData, setWordsData] = useState<WordResponseApi>({
		current_page: 1,
		data: [],
		last_page: 1,
		total: 0,
	});

	const fetchPost = async (currentPage: number) => {
		try {
			const response = await axios.get<WordResponseApi>(`/words?page=${currentPage}`);
			setWordsData(response.data);
		} catch (error) {
			console.log(error);
		}
	};
	return { fetchPost, wordsData };
};
