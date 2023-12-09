import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useState,
} from "react";

type FormData = {
	// user_id: number;
	word_en: string;
	word_ja: string;
	part_of_speech: number;
	memory: number;
	memo: string;
};
type FormDataContextType = {
	contextFormData: FormData;
	setContextFormData: Dispatch<SetStateAction<FormData>>;
};

const initialFormData: FormData = {
	// user_id: 1,
	word_en: "",
	word_ja: "",
	part_of_speech: 0,
	memory: 0,
	memo: "",
};

export const FormDataContext = createContext<FormDataContextType>(
	{} as FormDataContextType
);

export const FormDataProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const [contextFormData, setContextFormData] =
		useState<FormData>(initialFormData);

	return (
		<FormDataContext.Provider value={{ contextFormData, setContextFormData }}>
			{children}
		</FormDataContext.Provider>
	);
};
