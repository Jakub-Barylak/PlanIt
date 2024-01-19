"use client";

import TopBar from "@/ui/calendar/TopBar";
import CalendarView from "@/ui/calendar/Calendar";
import "react-toastify/dist/ReactToastify.css";

export default function Calendar() {
	return (
		<div className="grid h-screen grid-cols-1 grid-rows-[auto_minmax(0,1fr)] bg-white text-black">
			<TopBar />
			<CalendarView />
		</div>
	);
}
