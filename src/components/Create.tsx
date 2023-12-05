import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { ChangeEvent, FC, useState } from "react";
import "./Modal.css";
import { Memory, PartOfSpeech } from "../consts/constants";

type Props = {
  formData: {
    user_id: number;
		word_en: string;
		word_ja: string;
		part_of_speech: number;
		memory: number;
		memo: string;
	};
	handleInputChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => void;
	handleCreateSubmit: () => Promise<void>;
};

export const Create: FC<Props> = (props) => {
	const { formData, handleInputChange, handleCreateSubmit } = props;
	const [open, setOpen] = useState<boolean>(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<>
			<button
				onClick={handleOpen}
				className="inline-block text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
			>
				単語を登録
			</button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>新規登録</DialogTitle>
				<DialogContent>
					<form
						className="w-full"
						onSubmit={(e) => {
							e.preventDefault();
							handleCreateSubmit();
						}}
          >
            <input type="hidden" name="user_id" value={1} />
						<div className="flex flex-wrap -m-2">
							<div className="p-2 w-full">
								<div className="relative">
									<label className="leading-7 text-sm text-gray-600">
										英単語
									</label>
									<input
										type="text"
										id="word_en"
										name="word_en"
										value={formData.word_en}
										className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
										onChange={handleInputChange}
									/>
									<p className="text-rose-700"></p>
								</div>
							</div>
							<div className="p-2 w-full">
								<div className="relative">
									<label className="leading-7 text-sm text-gray-600">
										日本語訳
									</label>
									<input
										type="text"
										id="word_ja"
										name="word_ja"
										value={formData.word_ja}
										className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
										onChange={handleInputChange}
									/>
									<p className="text-rose-700"></p>
								</div>
							</div>
							<div className="p-2 w-full md:w-1/2">
								<div className="relative">
									<label className="leading-7 text-sm text-gray-600">
										品詞
									</label>
									<select
										name="part_of_speech"
										className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
										value={formData.part_of_speech}
										onChange={handleInputChange}
									>
										{/* <option value="">選択してください</option> */}
										{PartOfSpeech.map((item, index) => (
											<option key={index} value={index}>{item}</option>
										))}
									</select>
									<p className="text-rose-700"></p>
								</div>
							</div>
							<div className="p-2 w-full md:w-1/2">
								<div className="relative">
									<label className="leading-7 text-sm text-gray-600">
										記憶度
									</label>
									<select
										name="memory"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={formData.memory}
										onChange={handleInputChange}
									>
										{/* <option value="">選択してください</option> */}
										{Memory.map((item, index) => (
											<option key={index} value={index}>{item}</option>
										))}
									</select>
									<p className="text-rose-700"></p>
								</div>
							</div>
							<div className="p-2 w-full">
								<div className="relative">
									<label className="leading-7 text-sm text-gray-600">
										メモ
									</label>
									<textarea
										id="memo"
										name="memo"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    value={formData.memo}
										onChange={handleInputChange}
									/>
								</div>
							</div>
							<div className="p-2 w-full flex">
								<button
									type="button"
									className="flex mx-auto text-white bg-gray-300 border-0 py-2 px-4 focus:outline-none hover:bg-gray-400 rounded text-lg"
									onClick={handleClose}
								>
									戻る
								</button>
								<button
									type="submit"
									className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  onClick={handleClose}
								>
									登録
								</button>
							</div>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};
