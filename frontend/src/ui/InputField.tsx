import { FC, SetStateAction, Dispatch, useState } from "react";

interface Props {
	value: string;
	setValue: (value: SetStateAction<string>) => void;
	label: string;
	elementName: string;
	inputType?: string;
}

export const InputField: FC<Props> = ({
	value,
	setValue,
	label,
	elementName,
	inputType = "text",
}): JSX.Element => {
	return (
		<>
			<span className="px-1 text-sm text-gray-600 dark:text-white/80">
				{label}
			</span>
			<input
				type={inputType}
				id={elementName}
				name={elementName}
				className="     text-md block px-5 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md 
                                focus:placeholder-gray-500 
                                focus:bg-white 
                                focus:border-gray-600  
                                focus:outline-none
                                dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-500 dark:focus:placeholder-gray-400 dark:focus:bg-gray-700 dark:focus:border-gray-500 dark:focus:outline-none"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</>
	);
};
