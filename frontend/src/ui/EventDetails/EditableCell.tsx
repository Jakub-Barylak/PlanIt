"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";

type EditableCellProps = {
	value: string;
	name: string;
	type: "text" | "datetime-local";
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function EditableCell(props: EditableCellProps) {
	// const [value, setValue] = useState(props.value);
	const [isEditing, setIsEditing] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditing) {
			inputRef.current?.focus();
		}
	}, [isEditing]);

	return (
		<div className="relative">
			{isEditing ? (
				<input
					type={props.type}
					className="w-full rounded-2xl border-2 border-solid border-[#C4C4C4] p-2 text-black"
					defaultValue={
						props.type === "datetime-local"
							? props.value.slice(0, props.value.length - 4)
							: props.value
					}
					name={props.name}
					placeholder={props.name === "description" ? "Description" : ""}
					onChange={props.onChange}
					onBlur={() => setIsEditing(false)}
					ref={inputRef}
				/>
			) : (
				<p
					className="rounded-2xl border-2 border-solid border-[#C4C4C4] p-2 text-[#A0A0A0]"
					onDoubleClick={() => setIsEditing(true)}
				>
					{props.name === "description" && props.value === ""
						? "No description"
						: props.value}
				</p>
			)}
		</div>
	);
}
