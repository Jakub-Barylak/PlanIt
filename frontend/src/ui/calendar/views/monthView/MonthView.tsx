import MonthDayView from "./MonthDayView";
import { useContext } from "react";
import {
	CalendarViewContext,
	CalendarViewContextType,
} from "@/app/calendar/page";
import { DateTime } from "luxon";
import type { EventColor } from "@/lib/types";

export default function MonthView() {
	// DATE SETUP

	const { calendars, startDate } = useContext(
		CalendarViewContext,
	) as CalendarViewContextType;

	const today = new Date();
	const month = startDate.month;
	const year = startDate.year;
	// const month = today.getMonth() + 1;

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

	const daysToAddInFront = firstDayInMonth === 0 ? 6 : firstDayInMonth - 1; // replace with (firstDayInMonth - 1) % 7
	const daysToAddInBack = lastDayInMonth === 0 ? 0 : 7 - lastDayInMonth; // replace with (7 - lastDayInMonth) % 7
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

	calendars.forEach((calendar) => {
		calendar?.events?.forEach((event) => {
			const date = new Date(event.begin_date);
			const day = date.toLocaleDateString();
			if (dayMap.has(day)) {
				dayMap
					.get(day)
					.push({ event: event, color: calendar.color } as EventColor);
			} else {
				dayMap.set(day, [
					{ event: event, color: calendar.color } as EventColor,
				]);
			}
		});
	});

	return (
		<>
			<div className="m-10 grid h-full grid-cols-7 grid-rows-[auto_1fr]">
				{/* show days of week */}
				{[...Array(7)].map((_, i) => {
					return (
						<div className="px-3 text-right">
							{DateTime.fromISO(`2024-01-0${i + 1}T13:07:04.054`).toFormat(
								"ccc",
							)}
						</div>
					);
				})}
				<div className=" col-span-7 flex-grow overflow-hidden rounded-2xl">
					<div
						className={`bg-lightMode-light-border grid-ro grid h-full w-full grid-cols-7 gap-[1px] overflow-hidden ${
							daysToAddInFront + daysInMonth + daysToAddInBack > 35
								? "grid-rows-6"
								: "grid-rows-5"
						}`}
					>
						{[...Array(daysToAddInFront + daysInMonth + daysToAddInBack)].map(
							(_, i) => {
								let date = new Date(year, month - 1, 1 - daysToAddInFront + i);
								return (
									<MonthDayView
										date={date}
										month={month}
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
				</div>
			</div>
		</>
	);
}