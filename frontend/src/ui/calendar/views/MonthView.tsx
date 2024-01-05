import MonthDayView from "./MonthDayView";
import { useContext } from "react";
import {
	CalendarViewContext,
	CalendarViewContextType,
} from "@/app/calendar/page";

export default function MonthView() {
	// DATE SETUP

	// const today = new Date();
	const today = new Date(2023, 11, 1);
	const year = today.getFullYear();
	const month = today.getMonth() + 1;

	const daysInMonth = new Date(year, month, 0).getDate();
	const firstDayInMonth = new Date(year, month - 1, 1).getDay();
	const lastDayInMonth = new Date(year, month, 0).getDay();
	/*  DAYS OF THE WEEK
        0 - Sunday
	    1 - Monday
	    2 - Tuesday
	    3 - Wednesday
	    4 - Thursday
	    5 - Friday
	    6 - Saturday
    */

	const daysToAddInFront = firstDayInMonth === 0 ? 6 : firstDayInMonth - 1;
	const daysToAddInBack = lastDayInMonth === 0 ? 0 : 7 - lastDayInMonth;
	const [beginDate, endDate] = [
		new Date(year, month - 1, 1 - daysToAddInFront),
		new Date(year, month, daysToAddInBack),
	];

	// ARRAY OF DAYS

	const days = [...Array(daysToAddInFront + daysInMonth + daysToAddInBack)].map(
		(_, i) => {
			return new Date(year, month - 1, 1 - daysToAddInFront + i);
		},
	);

	// EVENT FILTERING

	const dayMap = new Map();

	const { calendars } = useContext(
		CalendarViewContext,
	) as CalendarViewContextType;

	calendars.forEach((calendar) => {
		calendar?.events?.forEach((event) => {
			const date = new Date(event.begin_date);
			const day = date.toLocaleDateString();
			if (dayMap.has(day)) {
				dayMap.get(day).push(event);
			} else {
				dayMap.set(day, [event]);
			}
		});
	});

	return (
		<>
			<div className="grid h-full w-full grid-cols-7 content-stretch gap-2">
				{[...Array(daysToAddInFront + daysInMonth + daysToAddInBack)].map(
					(_, i) => {
						let date = new Date(year, month - 1, 1 - daysToAddInFront + i);
						return (
							<MonthDayView
								date={date}
								key={i}
								className={`${
									date.getMonth() + 1 !== month
										? "bg-slate-500"
										: "bg-slate-200"
								}`}
								events={
									dayMap.has(date.toLocaleDateString())
										? dayMap.get(date.toLocaleDateString())
										: []
								}
							/>
						);
					},
				)}
			</div>
		</>
	);
}
