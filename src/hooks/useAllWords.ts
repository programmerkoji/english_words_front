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

	const fetchPost = async (
		currentPage: number,
		memorySearch: string = "",
		sort: number = 1
	) => {
		try {
			let url = `/words?page=${currentPage}`;
			if (memorySearch) {
				url += `&memorySearch=${memorySearch}`;
			}
			if (sort) {
				url += `&sort=${sort}`;
			}
			const response = await axios.get<WordResponseApi>(url);
			setWordsData(response.data);
		} catch (error) {
			console.log(error);
		}
	};
	return { fetchPost, wordsData };
};
