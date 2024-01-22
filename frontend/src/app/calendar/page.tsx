"use client";

import TopBar from "@/ui/calendar/TopBar";
import CalendarView from "@/ui/calendar/Calendar";

export default function Calendar() {
	return (
		<div className="grid h-screen grid-cols-1 grid-rows-[auto_minmax(0,1fr)] text-black dark:text-white">
			<TopBar />
			<CalendarView />
		</div>
	);
}
