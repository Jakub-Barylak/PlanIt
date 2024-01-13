"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { DateTime } from "luxon";
import { Calendar, View } from "@/lib/types";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";

export type CalendarViewContextType = {
	view: View;
	setView: (view: View) => void;
	startDate: DateTime;
	setStartDate: (date: DateTime) => void;
	numberOfDays: number;
	setNumberOfDays: (days: number) => void;
	calendars: Calendar[];
	fetchCalendarsInRange: (begin_date: DateTime, end_date: DateTime) => void;
};

export const CalendarViewContext =
	createContext<CalendarViewContextType | null>(null);

export default function CalendarProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [activeView, setActiveView] = useState<View>("week");
	const [startDate, setStartDate] = useState(DateTime.now().startOf("week"));
	const [numberOfDays, setNumberOfDays] = useState(7);
	const [calendars, setCalendars] = useState<Calendar[]>([]);

	const { axios, accessToken, refreshToken } = useContext(
		AuthContext,
	) as AuthContextType;

	useEffect(() => {
		if (accessToken !== null) {
			axios
				.post("/user_calendars_events/", {
					begin_date: "2023-12-01",
					end_date: "2023-12-31",
				})
				.then((response) => {
					const data = response.data as Calendar[];
					setCalendars(data);
				})
				.catch((error) => console.log(error));
		}
	}, [accessToken, refreshToken]);

	function fetchCalendarsInRange(begin_date: DateTime, end_date: DateTime) {
		axios
			.post("/user_calendars_events/", {
				begin_date: begin_date.toISODate(),
				end_date: end_date.toISODate(),
			})
			.then((response) => {
				const data = response.data as Calendar[];
				// console.log(data);
				setCalendars(data);
			})
			.catch((error) => console.log(error));
	}

	return (
		<CalendarViewContext.Provider
			value={{
				view: activeView,
				setView: setActiveView,
				startDate: startDate,
				setStartDate: setStartDate,
				numberOfDays: numberOfDays,
				setNumberOfDays: setNumberOfDays,
				calendars,
				fetchCalendarsInRange,
			}}
		>
			{children}
		</CalendarViewContext.Provider>
	);
}
