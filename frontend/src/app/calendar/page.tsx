"use client";

import TopBar from "@/ui/calendar/TopBar";
import CalendarView from "@/ui/calendar/Calendar";
import { createContext, useState } from "react";
import { DateTime } from "luxon";

export type CalendarViewContextType = {
	view: string;
	setView: (view: string) => void;
	startDate: DateTime;
	setStartDate: (date: DateTime) => void;
};

export const CalendarViewContext =
	createContext<CalendarViewContextType | null>(null);

export default function Calendar() {
	const [activeView, setActiveView] = useState("week");
	const weekStart = DateTime.local().startOf("week");
	const [startDate, setStartDate] = useState(DateTime.now());
	return (
		<CalendarViewContext.Provider
			value={{
				view: activeView,
				setView: setActiveView,
				startDate: startDate,
				setStartDate: setStartDate,
			}}
		>
			<div className="flex flex-grow flex-col bg-white text-black">
				<TopBar />
				<CalendarView />
			</div>
		</CalendarViewContext.Provider>
	);
}
