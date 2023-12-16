import Image from "next/image";
import { useState } from "react";

export default function CalendarView() {
	let calendars = ["Calendar 1", "Calendar 2"];

	return (
		<>
			{calendars.map((calendar, index) => {
				const [isChecked, setIsChecked] = useState(
					sessionStorage.getItem(calendar) === "true",
				);
				const onChange = (key: string, value: boolean) => {
					sessionStorage.setItem(key, value.toString());
					setIsChecked(value);
				};
				return (
					<label
						key={index}
						className="flex h-8 items-center justify-between rounded-lg px-2 hover:bg-gray-100 dark:hover:bg-[#282A32]"
					>
						{/* grid grid-cols-[max-content_auto] */}
						<span>{calendar}</span>
						<input
							type="checkbox"
							className="ml-2 h-4 w-4 bg-gray-200 text-gray-600 accent-slate-600"
							checked={isChecked}
							onChange={(e) => onChange(calendar, e.target.checked)}
						/>
					</label>
				);
			})}
			<div className="flex items-center justify-between rounded-lg p-2">
				<input
					type="text"
					className="h-8 self-stretch rounded-lg border border-gray-300 px-2 dark:bg-[#4A4D54]"
					placeholder="New calendar"
				/>
				{/* PLUS BUTTON */}
				<div className="ml-2 h-4 w-4 cursor-pointer overflow-hidden rounded border-2 border-black bg-white dark:border-white dark:bg-black dark:text-white">
					<div className="flex -translate-y-[0.46rem] select-none items-center justify-center text-center">
						+
					</div>
				</div>
			</div>
		</>
	);
}
