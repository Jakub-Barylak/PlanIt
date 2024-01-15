import { useContext } from "react";
import {
	CalendarViewContext,
	CalendarViewContextType,
} from "@/providers/CalendarProvider";
import YearMonthView from "./YearMonthView";

export default function YearView() {
	const calendarContext = useContext(
		CalendarViewContext,
	) as CalendarViewContextType;

	const year = calendarContext.startDate.year as number;

	return (
		<div className="m-10 grid h-full grid-cols-4 items-stretch gap-4 overflow-hidden">
			{[...Array(12)].map((_, i) => {
				return <YearMonthView month={i + 1} year={year} key={year + "-" + i} />;
			})}
		</div>
	);
}
