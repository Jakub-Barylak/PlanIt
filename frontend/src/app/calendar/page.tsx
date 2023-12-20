"use client";

import TopBar from "@/ui/calendar/TopBar";
import CalendarView from "@/ui/calendar/Calendar";
import { createContext, useState, useEffect, useContext } from "react";
import { DateTime } from "luxon";
import { Calendar } from "@/lib/types";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";

export type CalendarViewContextType = {
	view: string;
	setView: (view: string) => void;
	startDate: DateTime;
	setStartDate: (date: DateTime) => void;
	calendars: Calendar[];
};

export const CalendarViewContext =
	createContext<CalendarViewContextType | null>(null);

export default function Calendar() {
	const [activeView, setActiveView] = useState("week");
	const weekStart = DateTime.local().startOf("week");
	const [startDate, setStartDate] = useState(DateTime.now());
	const [calendars, setCalendars] = useState<Calendar[]>([]);

	const { axios } = useContext(AuthContext) as AuthContextType;

	useEffect(() => {
		axios
			.post("/user_calendars_events/", {
				begin_date: "2023-12-01",
				end_date: "2023-12-31",
			})
			.then((response) => {
				const data = response.data as Calendar[];
				// console.log(data);
				setCalendars(data);
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<CalendarViewContext.Provider
			value={{
				view: activeView,
				setView: setActiveView,
				startDate: startDate,
				setStartDate: setStartDate,
				calendars,
			}}
		>
			<div className="flex flex-grow flex-col bg-white text-black">
				<TopBar />
				<CalendarView />
			</div>
		</CalendarViewContext.Provider>
	);
}
