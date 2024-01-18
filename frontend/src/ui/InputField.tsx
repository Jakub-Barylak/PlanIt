import { FC, SetStateAction, Dispatch, useState } from "react";

interface Props {
	value: string;
	setValue: (value: SetStateAction<string>) => void;
	label: string;
	elementName: string;
	inputType?: string;
	error?: boolean;
}

export const InputField: FC<Props> = ({
	value,
	setValue,
	label,
	elementName,
	inputType = "text",
	error = false,
}): JSX.Element => {
	return (
		<>
			<div>
				<span className="px-1 text-sm text-gray-600 dark:text-white/80">
					{label}
				</span>
				<input
					type={inputType}
					id={elementName}
					name={elementName}
					className={`text-md block w-full rounded-lg border-2 border-gray-300 bg-white px-5 py-2 placeholder-gray-600 shadow-md focus:border-gray-600 focus:bg-white focus:placeholder-gray-500 focus:outline-none dark:border-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-gray-500 dark:focus:bg-gray-700 dark:focus:placeholder-gray-400 dark:focus:outline-none ${
						error ? "border-red-500" : ""
					}`}
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
			</div>
		</>
	);
};
