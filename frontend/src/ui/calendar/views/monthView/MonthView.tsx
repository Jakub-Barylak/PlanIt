import MonthDayView from "./MonthDayView";
import { useContext, useLayoutEffect } from "react";
import {
	CalendarViewContext,
	CalendarViewContextType,
} from "@/providers/CalendarProvider";
import { DateTime } from "luxon";
import type { EventColor } from "@/lib/types";

export default function MonthView() {
	// DATE SETUP

	const calendarContext = useContext(
		CalendarViewContext,
	) as CalendarViewContextType;

	const today = new Date();
	const month = calendarContext.startDate.month;
	const year = calendarContext.startDate.year;
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

	// useLayoutEffect(() => {
	// 	console.log(
	// 		calendarContext.startDate.minus({ days: daysToAddInFront }).toISODate(),
	// 		calendarContext.startDate
	// 			.plus({ days: daysToAddInBack - 1, months: 1 })
	// 			.toISODate(),
	// 	);

	// 	calendarContext.fetchCalendarsInRange(
	// 		calendarContext.startDate.minus({ days: daysToAddInFront }),
	// 		calendarContext.startDate.plus({ days: daysToAddInBack - 1, months: 1 }),
	// 	);
	// }, [calendarContext.startDate]);

	// EVENT FILTERING

	const dayMap = new Map();

	calendarContext.calendars
		.filter((calendar) => calendar.isVisible)
		.forEach((calendar) => {
			calendar?.events?.forEach((event) => {
				const date = new Date(event.begin_date);
				const day = DateTime.fromJSDate(date);
				const eventLength = DateTime.fromISO(event.end_date).diff(
					DateTime.fromISO(event.begin_date),
					"days",
				).days;

				let dayIndex = eventLength >= 1 ? 1 : null;

				for (let i = 0; i < eventLength; i++, dayIndex!++) {
					const mDay = day.plus({ days: i }).toISODate();
					if (dayMap.has(mDay)) {
						dayMap.get(mDay).push({
							event: event,
							color: calendar.color,
							day: dayIndex,
						} as EventColor);
					} else {
						dayMap.set(mDay, [
							{
								event: event,
								color: calendar.color,
								day: dayIndex,
							} as EventColor,
						]);
					}
				}
			});
		});

	// console.log(dayMap);

	return (
		<>
			<div className="grid h-full grid-cols-7 grid-rows-[auto_1fr] p-10 dark:bg-none">
				{/* show days of week */}
				{[...Array(7)].map((_, i) => {
					return (
						<div className="px-3 text-right" key={i}>
							{DateTime.fromISO(`2024-01-0${i + 1}T13:07:04.054`).toFormat(
								"ccc",
							)}
						</div>
					);
				})}
				<div className="col-span-7 flex-grow overflow-hidden rounded-2xl bg-lightMode-border dark:border-1 dark:border-darkMode-border dark:bg-darkMode-border">
					<div
						className={`grid h-full w-full grid-cols-7 gap-[1px] overflow-y-auto ${
							daysToAddInFront + daysInMonth + daysToAddInBack > 35
								? "grid-rows-[repeat(6,minmax(0,1fr))]"
								: "grid-rows-[repeat(5,minmax(0,1fr))]"
						}`}
					>
						{[...Array(daysToAddInFront + daysInMonth + daysToAddInBack)].map(
							(_, i) => {
								const jsDate = new Date(
									year,
									month - 1,
									1 - daysToAddInFront + i,
								);
								const date = DateTime.fromJSDate(jsDate);
								return (
									<MonthDayView
										date={jsDate}
										month={month}
										key={crypto.randomUUID()}
										events={
											dayMap.has(date.toISODate())
												? dayMap.get(date.toISODate())
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
