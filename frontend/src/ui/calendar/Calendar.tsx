"use client";

import { useContext } from "react";
import {
	CalendarViewContext,
	CalendarViewContextType,
} from "@/providers/CalendarProvider";
import DaysView from "./views/DaysView";
import MonthView from "./views/monthView/MonthView";

export default function Calendar() {
	const context = useContext(CalendarViewContext) as CalendarViewContextType;
	if (
		context.view === "day" ||
		context.view === "3day" ||
		context.view === "week"
	) {
		let numberOfDays = 7;
		switch (context.view) {
			case "day":
				numberOfDays = 1;
				break;
			case "3day":
				numberOfDays = 3;
				break;
			case "week":
				numberOfDays = 7;
				break;
		}

		return (
			<div className="m-10 flex-grow overflow-y-auto rounded-2xl">
				<div className="flex flex-row flex-nowrap  bg-slate-300">
					<DaysView days={numberOfDays} start={context.startDate} />
				</div>
			</div>
		);
	} else if (context.view === "month") {
		return <MonthView />;
	}
}
