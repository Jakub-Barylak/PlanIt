import { DateTime } from "luxon";
import {
	CalendarViewContext,
	CalendarViewContextType,
} from "@/providers/CalendarProvider";
import { useContext, useEffect, useLayoutEffect } from "react";

export default function YearMonthView({
	month,
	year,
}: {
	month: number;
	year: number;
}) {
	const date = DateTime.fromObject({ year: year, month: month, day: 1 });
	const firstDayInMonth = new Date(year, month - 1, 1).getDay();
	const daysToAddInFront = firstDayInMonth === 0 ? 6 : firstDayInMonth - 1; // replace with (firstDayInMonth - 1) % 7

	const calendarContext = useContext(
		CalendarViewContext,
	) as CalendarViewContextType;

	useLayoutEffect(() => {});

	return (
		<div
			className="grid cursor-pointer grid-cols-1 grid-rows-[auto_1fr] gap-2 rounded-xl border-1 p-2 text-lg transition-background hover:bg-[#f6f7f9] light:border-lightMode-border dark:border-darkMode-border dark:hover:bg-darkMode-hover-bg"
			onClick={() => {
				calendarContext.setStartDate(date);
				calendarContext.setView("month");
			}}
		>
			<div className="justify-center text-center font-bold">
				{date.setLocale("en-en").toFormat("LLL").toUpperCase() + " " + year}
			</div>
			<div className="grid h-full w-full grid-cols-7 grid-rows-[repeat(7,1fr)] justify-center text-center text-sm [&>div:nth-child(7n)]:text-light-purple">
				{["M", "T", "W", "T", "F", "S", "S"].map((day, i) => {
					return (
						<div className="px-3 text-center font-semibold" key={i}>
							{day}
						</div>
					);
				})}
				{[...Array(daysToAddInFront)].map((_, i) => {
					return <div key={crypto.randomUUID()}></div>;
				})}
				{[...Array(date.daysInMonth)].map((_, i) => {
					i++;
					const today =
						DateTime.fromObject({ day: i, month: month, year: year }).toFormat(
							"yyyy-MM-dd",
						) === DateTime.now().toFormat("yyyy-MM-dd");

					return (
						<div
							key={crypto.randomUUID()}
							className={`align-center flex h-6 w-6 items-center justify-center place-self-center rounded ${
								today ? "bg-light-purple text-black" : ""
							})`}
						>
							<p className={today ? "text-black" : ""}>{i}</p>
						</div>
					);
				})}
				<div className=" col-start-7 row-start-7 h-full"></div>
			</div>
		</div>
	);
}
