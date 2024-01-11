import {
	CalendarViewContext,
	CalendarViewContextType,
} from "@/app/calendar/page";
import { useContext } from "react";
import { DateTime } from "luxon";
import DisplayDate from "./DisplayDate";

export default function DatePicker() {
	const context = useContext(CalendarViewContext) as CalendarViewContextType;
	const endDate = context.startDate.plus({ days: context.numberOfDays - 1 });
	let offset = {};
	if (
		context.view === "day" ||
		context.view === "3day" ||
		context.view === "week"
	) {
		offset = { days: context.numberOfDays };
	} else if (context.view === "month") {
		offset = { months: 1 };
	} else if (context.view === "year") {
		offset = { years: 1 };
	}
	return (
		<div className="flex flex-row gap-4">
			<p
				className="cursor-pointer font-bold"
				onClick={() => context.setStartDate(context.startDate.minus(offset))}
			>
				&lt;
			</p>
			{/* <div>
				{context.startDate.day} {context.startDate.monthLong}{" "}
				{context.startDate.year} - {endDate.day} {endDate.monthLong}{" "}
				{endDate.year}
			</div> */}
			<DisplayDate
				start={context.startDate}
				end={endDate}
				view={context.view}
			/>
			<p
				className="cursor-pointer font-bold"
				onClick={() => context.setStartDate(context.startDate.plus(offset))}
			>
				&gt;
			</p>
		</div>
	);
}
