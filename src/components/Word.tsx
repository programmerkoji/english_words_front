import React, { FC } from "react";

type Props = {
  word_en: string;
  created_at: string;
}

const Word:FC<Props> = (props) => {
  const { word_en, created_at } = props;
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
						<a
							href="https://from-forties.net/english-words/words/23/edit"
							className="mx-auto text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm"
						>
							編集
						</a>
					</div>
					<form
						id="delete_23"
						method="post"
						action="https://from-forties.net/english-words/words/23"
						className="text-right mt-2"
					>
						<input
							type="hidden"
							name="_token"
							value="M65f3DLicfo4cYO0tTqEkPPNxQXMzK6y7cULrIkV"
						/>{" "}
						<input type="hidden" name="_method" value="delete" />{" "}
						<span
							data-id="23"
							className="mx-auto text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-sm"
						>
							削除
						</span>
					</form>
				</div>
				<div className="w-full text-right mt-3">
          <p className="text-sm">登録：{ created_at }</p>
				</div>
			</div>
		</li>
	);
};

export default Word;
