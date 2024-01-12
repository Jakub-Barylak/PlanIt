"use client";

import TopBar from "@/ui/calendar/TopBar";
import CalendarView from "@/ui/calendar/Calendar";

export default function Calendar() {
	return (
		<div className="flex flex-grow flex-col bg-white text-black">
			<TopBar />
			<CalendarView />
		</div>
	);
}
