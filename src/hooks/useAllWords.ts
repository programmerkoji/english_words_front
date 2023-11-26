/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useState } from "react";
import { Word, WordResponseApi } from "../types/word";

export const useAllWords = () => {
  const [wordsData, setWordsData] = useState<WordResponseApi>({
    current_page: 0,
    data: [],
    last_page: 0,
    total: 0,
  });

	const getWords = useCallback(() => {
		axios
			.get<WordResponseApi>("/words")
      .then((res) => setWordsData(res.data))
			.catch(() => {});
	}, []);
	return { getWords, wordsData };
};
