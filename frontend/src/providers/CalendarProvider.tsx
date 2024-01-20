"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { DateTime } from "luxon";
import { Calendar, View, Event } from "@/lib/types";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

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
	updateCalendar: (calendarId: number, name?: string, color?: string) => void;
	shareCalendar: (calendarId: number, email: string, coworked: boolean) => void;
	deleteEvent: (calendarId: number, eventId: number) => void;
	editEvent: (calendarId: number, updatedEvent: Event) => void;
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
		const randomColors = [
			"#37afa0",
			"#746086",
			"#fd8459",
			"#f0a361",
			"#892753",
			"#ddd8e9",
			"#3b475c",
			"#f4e3f6",
			"#acf23f",
			"#f4f380",
			"#328d9e",
			"#e8b8b8",
		];
		const randomIndex = Math.floor(Math.random() * randomColors.length);

		const t = toast.loading("Creating calendar...");
		axios
			.post("/user_calendars/", {
				name: name,
				// color: "#BEC0F2",
				color: randomColors[randomIndex],
			})
			.then((response) => {
				const calendar = response.data as Calendar;
				calendar.isVisible = true;
				setCalendars([...calendars, calendar]);
				toast.update(t, {
					render: `Calendar ${calendar.name} successfully created`,
					type: "success",
					isLoading: false,
					autoClose: 3000,
				});
				// toast.success(`Calendar ${calendar.name} successfully created`);
			})
			.catch((error) => {
				toast.update(t, {
					render: "Error when creating calendar",
					type: "error",
					isLoading: false,
					autoClose: 3000,
				});
				console.log(error);
			});
	}

	function deleteCalendar(calendarId: number) {
		const t = toast.loading("Deleting calendar...");
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
				toast.update(t, {
					render: `Calendar successfully deleted`,
					type: "success",
					isLoading: false,
					autoClose: 3000,
				});
			})
			.catch((error) => {
				console.log(error);
				toast.update(t, {
					render: "Error when deleting calendar",
					type: "error",
					isLoading: false,
					autoClose: 3000,
				});
			});
	}

	function updateCalendar(calendarId: number, name?: string, color?: string) {
		const calendarsCopy = structuredClone(calendars);
		const calendar = calendarsCopy.find((c) => c.id === calendarId);
		if (calendar === undefined) {
			console.log("calendar not found");
			return;
		}
		const t = toast.loading("Updating calendar...");
		axios
			.patch("/delete_calendar/", {
				calendarId: calendarId,
				name: name ?? calendar.name,
				color: color ?? calendar.color,
			})
			.then((response) => {
				console.log(response);
				console.log("calendar " + calendarId + " updated");
				calendar.name = name ?? calendar.name;
				calendar.color = color ?? calendar.color;
				setCalendars(calendarsCopy);
				toast.update(t, {
					render: `Calendar successfully updated`,
					type: "success",
					isLoading: false,
					autoClose: 3000,
				});
			})
			.catch((error) => {
				console.log(error);
				toast.update(t, {
					render: "Error when updating calendar",
					type: "error",
					isLoading: false,
					autoClose: 3000,
				});
			});
	}

	function shareCalendar(calendarId: number, email: string, coworked: boolean) {
		const t = toast.loading("Sharing calendar...");
		axios
			.post(`/calendars/${calendarId}/share-calendar/`, {
				user_email: email,
				coworked: coworked,
			})
			.then((response) => {
				console.log(response);
				toast.update(t, {
					render: `Calendar successfully shared with ${email}`,
					type: "success",
					isLoading: false,
					autoClose: 3000,
				});
			})
			.catch((error) => {
				console.log(error);
				toast.update(t, {
					render: "Error when sharing calendar",
					type: "error",
					isLoading: false,
					autoClose: 3000,
				});
			});
	}

	function deleteEvent(calendarId: number, eventId: number) {
		const calendarsCopy = structuredClone(calendars);
		const newCalendars = calendarsCopy.map((calendar) => {
			if (calendar.id === calendarId) {
				const eventIndex = calendar.events.findIndex(
					(event) => event.id === eventId,
				);
				if (eventIndex !== -1) {
					calendar.events.splice(eventIndex, 1);
				}
				return calendar;
			} else {
				return calendar;
			}
		});
		setCalendars(newCalendars);
	}

	function editEvent(calendarId: number, updatedEvent: Event) {
		const calendarsCopy = structuredClone(calendars);
		const newCalendars = calendarsCopy.map((calendar) => {
			if (calendar.id === calendarId) {
				const eventIndex = calendar.events.findIndex(
					(event) => event.id === updatedEvent.id,
				);
				if (eventIndex !== -1) {
					calendar.events[eventIndex] = updatedEvent;
				}
				return calendar;
			} else {
				return calendar;
			}
		});
		setCalendars(newCalendars);
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
				shareCalendar,
				updateCalendar,
				deleteEvent,
				editEvent,
			}}
		>
			{children}
		</CalendarViewContext.Provider>
	);
}
