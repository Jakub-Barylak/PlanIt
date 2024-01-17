"use client";

import TopBar from "@/ui/calendar/TopBar";
import CalendarView from "@/ui/calendar/Calendar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Calendar() {
	return (
		<div className="flex h-screen flex-grow flex-col bg-white text-black">
			<TopBar />
			<CalendarView />
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover={false}
				theme="colored"
			/>
		</div>
	);
}
