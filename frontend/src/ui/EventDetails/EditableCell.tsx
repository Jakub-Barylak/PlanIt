"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { DateTime } from "luxon";
import Markdown from "react-markdown";

type EditableCellProps = {
	value: string;
	name: string;
	type: "text" | "datetime-local" | "textarea";
	onChange: (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;
	canEdit: boolean;
};

export default function EditableCell(props: EditableCellProps) {
	const [isEditing, setIsEditing] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (isEditing) {
			if (props.type === "textarea") textareaRef.current?.focus();
			else inputRef.current?.focus();
		}
	}, [isEditing]);

	let displayValue = props.value;
	if (props.name === "description" && props.value === "") {
		displayValue = "No description";
	} else if (props.name === "begin_date" || props.name === "end_date") {
		displayValue = DateTime.fromISO(props.value)
			.minus({ hour: 1 })
			.toLocaleString(DateTime.DATETIME_SHORT);
	}
	if (isEditing && props.canEdit === true) {
		if (props.type === "textarea") {
			return (
				<div className="relative">
					<textarea
						rows={4}
						className=" w-full rounded-2xl border-2 border-solid border-[#C4C4C4] p-2 text-black"
						defaultValue={props.value}
						name={props.name}
						placeholder={props.name === "description" ? "Description" : ""}
						onChange={props.onChange}
						onBlur={() => setIsEditing(false)}
						ref={textareaRef}
					/>
				</div>
			);
		} else
			return (
				<div className="relative">
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
				</div>
			);
	} else if (props.name === "description") {
		return (
			<div className="relative" onDoubleClick={() => setIsEditing(true)}>
				<Markdown
					className="h-24 overflow-y-auto rounded-2xl border-2 border-solid border-[#C4C4C4] p-2 text-[#A0A0A0]"
					children={displayValue}
				/>
			</div>
		);
	} else {
		return (
			<div className="relative">
				<p
					className="rounded-2xl border-2 border-solid border-[#C4C4C4] p-2 text-[#A0A0A0]"
					onDoubleClick={() => setIsEditing(true)}
				>
					{displayValue}
				</p>
			</div>
		);
	}
}
