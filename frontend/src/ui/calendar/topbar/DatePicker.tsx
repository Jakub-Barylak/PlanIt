import {
	CalendarViewContext,
	CalendarViewContextType,
} from "@/providers/CalendarProvider";
import { useContext } from "react";
import { DateTime } from "luxon";
import DisplayDate from "./DisplayDate";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

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
		<div className="grid grid-cols-[min-content_auto_min-content] items-center">
			<FaChevronLeft
				className="cursor-pointer text-2xl"
				onClick={() => {
					if (context.view === "month")
						context.setStartDate(
							context.startDate.startOf("month").minus(offset),
						);
					else context.setStartDate(context.startDate.minus(offset));
					// context.fetchCalendars();
				}}
			/>
			{/* <div>
				{context.startDate.day} {context.startDate.monthLong}{" "}
				{context.startDate.year} - {endDate.day} {endDate.monthLong}{" "}
				{endDate.year}
			</div> */}
			<p className="text-center">
				<DisplayDate
					start={context.startDate}
					end={endDate}
					view={context.view}
				/>
			</p>
			<FaChevronRight
				className="cursor-pointer text-2xl"
				onClick={() => {
					if (context.view === "month")
						context.setStartDate(
							context.startDate.startOf("month").plus({ months: 1 }),
						);
					else context.setStartDate(context.startDate.plus(offset));
					// context.fetchCalendars();
				}}
			/>
		</div>
	);
}
