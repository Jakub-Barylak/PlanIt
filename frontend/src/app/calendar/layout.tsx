"use client";

import { SideNav } from "@/ui/Sidebar/SideNav";
import DailyPlanner from "@/ui/DailyPlanner";
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
			.get("/user_calendars/")
			.then((response) => {
				const data = response.data as Calendar[];
				setCalendars(data);
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		// <NextUIProvider>
		<div className="flex h-screen w-full">
			<SideNav calendars={calendars} />
			{children}
			{/* <DailyPlanner /> */}
		</div>
		// </NextUIProvider>
	);
}
