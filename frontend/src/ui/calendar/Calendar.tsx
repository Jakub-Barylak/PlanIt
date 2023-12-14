"use client";

import { useContext } from "react";
import {
	CalendarViewContext,
	CalendarViewContextType,
} from "@/app/calendar/page";
import DaysView from "./views/DaysView";

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
			<div className="flex w-full flex-grow flex-row flex-nowrap overflow-y-auto bg-slate-300">
				<DaysView days={numberOfDays} />
			</div>
		);
	}
}
