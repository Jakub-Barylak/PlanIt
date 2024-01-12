"use client";

import { SideNav } from "@/ui/Sidebar/SideNav";
import DailyPlanner from "@/ui/DailyPlaner/DailyPlaner";
import { NextUIProvider } from "@nextui-org/system";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { Calendar } from "@/lib/types";

export default function CalendarLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { axios } = useContext(AuthContext) as AuthContextType;
	const [calendars, setCalendars] = useState<Calendar[]>([]);

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
		<NextUIProvider>
			<div className="flex h-screen w-full">
				<SideNav />
				{children}
				<DailyPlanner />
			</div>
		</NextUIProvider>
	);
}
