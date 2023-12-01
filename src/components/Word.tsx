import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import React, { FC, useState } from "react";
import Delete from "./Delete";

type Props = {
	word_id: number;
	word_en: string;
	created_at: string;
	onDelete: (word_id: number) => void;
};

const Word: FC<Props> = (props) => {
	const { word_id, word_en, created_at, onDelete } = props;

	const handleClickAnswer = () => {
		console.log(word_id);
	}

	const date = new Date(created_at);
	const formattedCreatedData = date.toLocaleString("ja-JP", {
		timeZone: "Asia/Tokyo",
	});

	return (
		<li className="w-full xl:w-1/3 md:w-1/2 p-2">
			<div className="border border-gray-200 p-3 rounded-lg flex flex-wrap items-center justify-between">
				<div className="flex items-center gap-4 w-3/4">
					<div className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-yellow-500">
						<img
							src="https://from-forties.net/english-words/images/usually_icon.svg"
							alt=""
							className="w-5 h-5"
						/>
					</div>
					<div className="w-4/5">
						<p className="text-lg text-gray-900 font-medium title-font break-words mb-1">
							{word_en}
						</p>
						<button
							onClick={handleClickAnswer}
							className="text-xs px-2 py-1 rounded-sm border-solid border-indigo-500 border text-indigo-500"
						>
							答えを見る
						</button>
					</div>
				</div>
				<div className="w-1/4">
					<div className="text-right">
						<button className="mx-auto text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm">
							編集
						</button>
					</div>
					<div className="text-right mt-2">
						<Delete word_id={word_id} onDelete={onDelete} />
					</div>
				</div>
				<div className="w-full text-right mt-3">
					<p className="text-sm">登録：{formattedCreatedData}</p>
				</div>
			</div>
		</li>
	);
};

export default Word;
