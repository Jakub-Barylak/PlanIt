"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { DateTime } from "luxon";
import { Calendar, View } from "@/lib/types";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import { AxiosError } from "axios";

export type CalendarViewContextType = {
	view: View;
	setView: (view: View) => void;
	startDate: DateTime;
	setStartDate: (date: DateTime) => void;
	numberOfDays: number;
	setNumberOfDays: (days: number) => void;
	calendars: Calendar[];
	toggleCalendarVisibility: (calendarId: number) => void;
	addCalendar: (name: string) => void;
	deleteCalendar: (calendarId: number) => void;
	// fetchCalendarsInRange: (begin_date: DateTime, end_date: DateTime) => void;
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

	const currentDate = DateTime.now();
	const [startFetch, setStartFetch] = useState(
		currentDate.startOf("month").minus({ months: 1 }),
	);
	const [endFetch, setEndFetch] = useState(
		currentDate.endOf("month").plus({ months: 1 }),
	);

	const { axios, accessToken, refreshToken } = useContext(
		AuthContext,
	) as AuthContextType;

	// Refetch calendars when one of the tokens is updated
	useEffect(() => {
		if (accessToken !== null) {
			axios
				.post("/events/get-all-user-events/", {
					begin_date: startFetch.toISODate(),
					end_date: endFetch.toISODate(),
				})
				.then((response) => {
					const data = response.data as Calendar[];
					data.forEach((calendar) => {
						calendar.isVisible = calendar.isVisible ?? true;
					});
					setCalendars(data);
				})
				.catch((error: AxiosError) => {
					if (error?.response?.status !== 401) console.log(error);
				});
		}
	}, [accessToken, refreshToken]);

	const calendarCallback = (data: Calendar[]) => {
		const calendarsCopy = structuredClone(calendars);
		data.forEach((calendar) => {
			calendarsCopy
				.find((c) => c.id === calendar.id)
				?.events?.push(...calendar.events);
		});
		setCalendars(calendarsCopy);
	};

	// Fetch more calendars when the start date is changed
	useEffect(() => {
		const durationToStart = startDate.diff(startFetch, "days").days;
		const durationToEnd = endFetch.diff(startDate, "days").days;
		if (durationToEnd < 31) {
			setEndFetch(endFetch.plus({ months: 1 }));
			_fetchCalendarsInRange(
				endFetch,
				endFetch.plus({ months: 1 }),
				calendarCallback,
			);
		}
		if (durationToStart < 31) {
			setStartFetch(startFetch.minus({ months: 1 }));
			_fetchCalendarsInRange(
				startFetch.minus({ months: 1 }),
				startFetch,
				calendarCallback,
			);
		}
	}, [startDate]);

	// function fetchCalendarsInRange(begin_date: DateTime, end_date: DateTime) {
	// 	axios
	// 		.post("/events/get-all-user-events/", {
	// 			begin_date: begin_date.toISODate(),
	// 			end_date: end_date.toISODate(),
	// 		})
	// 		.then((response) => {
	// 			const data = response.data as Calendar[];
	// 			// console.log(data);
	// 			setCalendars(data);
	// 		})
	// 		.catch((error: AxiosError) => {
	// 			if (error.response?.status !== 401) console.log(error);
	// 		});
	// }

	function _fetchCalendarsInRange(
		begin_date: DateTime,
		end_date: DateTime,
		callback: (data: Calendar[]) => void,
	) {
		axios
			.post("/events/get-all-user-events/", {
				begin_date: begin_date.toISODate(),
				end_date: end_date.toISODate(),
			})
			.then((response) => {
				const data = response.data as Calendar[];
				callback(data);
			})
			.catch((error: AxiosError) => {
				if (error?.response?.status !== 401) console.log(error);
			});
	}

	function toggleCalendarVisibility(calendarId: number) {
		const calendarsCopy = structuredClone(calendars);
		const calendar = calendarsCopy.find((c) => c.id === calendarId);
		calendar!.isVisible = !calendar?.isVisible ?? false;
		setCalendars(calendarsCopy);
	}

	function addCalendar(name: string) {
		axios
			.post("/user_calendars/", {
				name: name,
				color: "#000000",
			})
			.then((response) => {
				const calendar = response.data as Calendar;
				calendar.isVisible = true;
				setCalendars([...calendars, calendar]);
				// calendars.push(response.data as Calendar);
			})
			.catch((error) => {
				alert("Error creating calendar!");
				console.log(error);
			});
	}

	function deleteCalendar(calendarId: number) {
		axios
			.delete(`/delete_calendar/`, {
				data: {
					calendarId: calendarId,
				},
			})
			.then((response) => {
				console.log(response);
				console.log("calendar " + calendarId + " deleted");
				const calendarsCopy = structuredClone(calendars);
				calendarsCopy.splice(
					calendarsCopy.findIndex((c) => c.id === calendarId),
					1,
				);
				setCalendars(calendarsCopy);
			})
			.catch((error) => {
				console.log(error);
			});
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
				toggleCalendarVisibility,
				addCalendar,
				deleteCalendar,
			}}
		>
			{children}
		</CalendarViewContext.Provider>
	);
}
