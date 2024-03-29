"use client";

import { SideNav } from "@/ui/Sidebar/SideNav";
import DailyPlanner from "@/ui/DailyPlaner/DailyPlaner";
import { NextUIProvider } from "@nextui-org/system";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CalendarLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<NextUIProvider>
			<div className="grid max-h-screen w-full grid-cols-[auto_minmax(0,1fr)_auto] bg-lightMode-background dark:bg-darkMode-background">
				<SideNav />
				{children}
				<DailyPlanner />
			</div>
			<ToastContainer
				position="bottom-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover={false}
				theme="colored"
			/>
		</NextUIProvider>
	);
}
