import React, { FC, useState } from "react";
import Delete from "./Delete";

import "./Modal.css";
import { Answer } from "./Answer";

type Props = {
	word_id: number;
	word_en: string;
	word_ja: string;
	part_of_speech: number;
	memory: number;
	memo: string;
	created_at: string;
	onDelete: (word_id: number) => void;
};

const Word: FC<Props> = (props) => {
	const { word_id, word_en, created_at, onDelete, ...otherProps } = props;

	const memory = otherProps.memory;

	let memoryImageUrl = "";
	let memoryColor = "";
	switch (memory) {
		case 0:
			memoryImageUrl = "./images/smile_icon.svg";
			memoryColor =
				"w-8 h-8 inline-flex items-center justify-center rounded-full bg-green-500";
			break;
		case 1:
			memoryImageUrl = "./images/usually_icon.svg";
			memoryColor =
				"w-8 h-8 inline-flex items-center justify-center rounded-full bg-yellow-500";
			break;
		case 2:
			memoryImageUrl = "./images/cry_icon.svg";
			memoryColor =
				"w-8 h-8 inline-flex items-center justify-center rounded-full bg-red-500";
			break;
	}
	const date = new Date(created_at);
	const formattedCreatedData = date.toLocaleString("ja-JP", {
		timeZone: "Asia/Tokyo",
	});

	return (
		<li key={word_id} className="w-full xl:w-1/3 md:w-1/2 p-2">
			<div className="border border-gray-200 p-3 rounded-lg flex flex-wrap items-center justify-between">
				<div className="flex items-center gap-4 w-3/4">
					<div className={memoryColor}>
						<img src={memoryImageUrl} alt="" className="w-5 h-5" />
					</div>
					<div className="w-4/5">
						<p className="text-lg text-gray-900 font-medium title-font break-words mb-1">
							{word_en}
						</p>
						<Answer {...otherProps} />
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
					<p className="text-sm">登録日：{formattedCreatedData}</p>
				</div>
			</div>
		</li>
	);
};

export default Word;
