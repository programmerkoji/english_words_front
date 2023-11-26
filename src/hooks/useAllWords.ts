/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useState } from "react";
import { WordResponseApi } from "../types/word";

export const useAllWords = () => {
	const [wordsData, setWordsData] = useState<WordResponseApi>({
		current_page: 0,
		data: [],
		last_page: 0,
		total: 0,
  });

	const getWords = useCallback((currentPage: number) => {
		axios
			.get<WordResponseApi>(`/words?page=${currentPage}`)
			.then((res) => {
        setWordsData(res.data)
        console.log(res.data);
			})
			.catch(() => {});
	}, []);
	return { getWords, wordsData };
};
