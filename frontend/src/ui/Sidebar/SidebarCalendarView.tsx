import { useState, useContext, useEffect } from "react";
import { AuthContextType, AuthContext } from "@/providers/AuthProvider";
import {
	CalendarViewContext,
	CalendarViewContextType,
} from "@/providers/CalendarProvider";
import { FaRegPlusSquare } from "react-icons/fa";
import { SidebarCalendarComponent } from "./SidebarCalendarComponent";

export default function CalendarView() {
	const [newCalendarName, setNewCalendarName] = useState<string>("");
	const { axios } = useContext(AuthContext) as AuthContextType;
	const calendarContext = useContext(
		CalendarViewContext,
	) as CalendarViewContextType;

	let addCalendar = (e: React.FormEvent) => {
		e.preventDefault();
		calendarContext.addCalendar(newCalendarName);
		setNewCalendarName("");
	};

	return (
		<>
			{calendarContext.calendars.map((calendar, _) => {
				return (
					// <>
					<SidebarCalendarComponent
						calendar={calendar}
						key={crypto.randomUUID()}
					/>
					// </>
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
