import { useState, useContext } from "react";
import { AuthContextType, AuthContext } from "@/providers/AuthProvider";
import { FaRegPlusSquare } from "react-icons/fa";

import type { Calendar } from "@/lib/types";

export default function CalendarView({ calendars }: { calendars: Calendar[] }) {
	// let calendars = ["Calendar 1", "Calendar 2"];

	const [newCalendarName, setNewCalendarName] = useState<string>("");
	const { axios } = useContext(AuthContext) as AuthContextType;

	let addCalendar = (e: React.FormEvent) => {
		e.preventDefault();
		axios
			.post("/user_calendars/", {
				name: newCalendarName,
				color: "#000000",
			})
			.then((response) => {
				console.log(response);
				// calendars.push(response.data as Calendar);
				setNewCalendarName("");
			})
			.catch((error) => {
				alert("Error creating calendar!");
				console.log(error);
			});
	};

	return (
		<>
			{calendars.map((calendar, index) => {
				const [isChecked, setIsChecked] = useState(
					sessionStorage.getItem(calendar.name) !== "true",
				);

				const changeChecked = (key: string, value: boolean) => {
					sessionStorage.setItem(key, value.toString());
					setIsChecked(value);
				};

				return (
					<>
						<label
							key={index}
							className="grid h-8 grid-cols-[minmax(0,1fr)_min-content] items-center justify-between gap-2 rounded-lg px-2 hover:bg-gray-100 dark:hover:bg-[#282A32]"
						>
							{/* grid grid-cols-[max-content_auto] */}
							<span className="truncate">{calendar.name}</span>
							<input
								type="checkbox"
								className="ml-2 h-4 w-4 bg-gray-200 text-gray-600 accent-slate-600"
								checked={isChecked}
								onChange={(e) => changeChecked(calendar.name, e.target.checked)}
							/>
						</label>
					</>
				);
			})}
			<form
				className="grid grid-cols-[minmax(0,1fr)_min-content] items-center gap-2 rounded-lg p-2"
				// onSubmit={addCalendar}
			>
				<input
					type="text"
					className="h-8 self-stretch rounded-lg border border-gray-300 px-2 dark:bg-[#4A4D54]"
					placeholder="New calendar"
					value={newCalendarName}
					onChange={(e) => setNewCalendarName(e.target.value)}
				/>
				{/* PLUS BUTTON */}
				<FaRegPlusSquare className="m-0 h-4 w-4 p-0" onClick={addCalendar} />
			</form>
		</>
	);
}
