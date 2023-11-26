import axios from "axios";
import { useCallback, useState } from "react";
import { Word } from "../types/word";

export const useAllWords = () => {
	const [words, setWords] = useState<Array<Word>>([]);

	const getWords = useCallback(() => {
		axios
			.get("/words")
			.then((res) => setWords(res.data.data))
			.catch(() => {});
	}, []);
	return { getWords, words };
};
