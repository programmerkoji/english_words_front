import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import React, { FC, useState } from "react";

type Props = {
	word_id: number;
	word_en: string;
	created_at: string;
	onDelete: (word_id: number) => void;
};

const Word: FC<Props> = (props) => {
	const { word_id, word_en, created_at, onDelete } = props;
	const [open, setOpen] = useState(false);

	const handleDeleteClick = () => {
		onDelete(word_id);
		setOpen(false);
	};
	const handleClickAlart = () => setOpen(true);
	const handleCloseAlart = () => setOpen(false);

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
						<span
							data-micromodal-trigger="modal-23"
							className="text-xs px-2 py-1 rounded-sm border-solid border-indigo-500 border text-indigo-500"
						>
							答えを見る
						</span>
					</div>
				</div>
				<div className="w-1/4">
					<div className="text-right">
						<button className="mx-auto text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm">
							編集
						</button>
					</div>
					<div className="text-right mt-2">
						<button
							onClick={handleClickAlart}
							className="mx-auto text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-sm"
						>
							削除
						</button>
						<Dialog
							open={open}
							onClose={handleCloseAlart}
							aria-labelledby="単語削除"
							aria-describedby="クリックした単語を削除します"
						>
							<DialogTitle id="alert-dialog-title">
								{"本当に単語を削除しますか？"}
							</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-description">
									一度削除すると、元に戻せなくなります。
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleCloseAlart}>やっぱりやめる</Button>
								<Button onClick={handleDeleteClick} autoFocus>
									削除する
								</Button>
							</DialogActions>
						</Dialog>
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
