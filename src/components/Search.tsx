import { ChangeEvent, FC, memo } from "react";
import { MemorySymbol, Sort } from "../consts/constants";

export type selectData = {
	memorySearch: string;
	sort: number;
};

type Props = {
	selectData: selectData;
	handleSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	handleSearchSubmit: (selectData: selectData) => void;
};

export const Search: FC<Props> = ({
	selectData,
	handleSelectChange,
	handleSearchSubmit,
}) => {
  return (
		<form
			className="md:ml-auto flex justify-end gap-2 w-full md:w-1/3"
			onSubmit={(e) => {
				e.preventDefault();
				handleSearchSubmit(selectData);
			}}
		>
			<select
				name="memorySearch"
				className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={selectData.memorySearch}
				onChange={handleSelectChange}
			>
				<option value="">記憶度</option>
				{MemorySymbol.map((item, key) => (
					<option key={key} value={key}>{item}</option>
				))}
			</select>
			<select
				name="sort"
				className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				onChange={handleSelectChange}
			>
				{Sort.map((item) => (
					<option key={item.value} value={item.value}>{item.label}</option>
				))}
      </select>
      <button type="submit" style={{ display: 'none' }}></button>
		</form>
	);
};
