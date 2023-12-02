import { ClearOutlined } from "@mui/icons-material";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { FC, useState } from "react";
import { Memory, PartOfSpeech } from "../consts/constants";

type Props = {
	word_ja: string;
	part_of_speech: number;
	memory: number;
	memo: string;
};

export const Answer: FC<Props> = (props) => {
  const { word_ja, part_of_speech, memory, memo } = props;
	const [answerOpen, setAnswerOpen] = useState<boolean>(false);

	const handleClickAnswer = () => setAnswerOpen(true);
	const handleCloseAnswer = () => setAnswerOpen(false);
  const partOfSpeechString = PartOfSpeech[part_of_speech];

	return (
		<>
			<button
				onClick={handleClickAnswer}
				className="text-xs px-2 py-1 rounded-sm border-solid border-indigo-500 border text-indigo-500"
			>
				答えを見る
			</button>
			<Dialog
				open={answerOpen}
				onClose={handleCloseAnswer}
				aria-labelledby="答え"
				aria-describedby="クリックして答えをみます"
			>
				<DialogContent>
					<div className="modal__header">
						<div className="flex items-center gap-4">
							<p className="text-sm px-2 py-1 rounded-sm border-solid border-indigo-500 border text-indigo-500 min-w-fit">
								{partOfSpeechString}
							</p>
							<p className="modal__title" id="modal-{{ $word->id }}-title">
								{word_ja}
							</p>
						</div>
						<ClearOutlined
							onClick={handleCloseAnswer}
							className="modal__close"
						/>
					</div>
					<div className="modal__memo">
						<p>{memo}</p>
					</div>
				</DialogContent>
				<DialogActions>
					<ul className="flex flex-col md:flex-row gap-2 w-full">
						{Memory.map((item, index) => (
							<li key={index}>
								<button
									type="submit"
									name="memory"
									value={memory}
									className={
										memory === index ? "modal__btn select" : "modal__btn"
									}
								>
									{item}
								</button>
							</li>
						))}
					</ul>
				</DialogActions>
			</Dialog>
		</>
	);
};
