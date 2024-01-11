import { DateTime } from "luxon";
import AddEventButton from "./topbar/AddEventButton";
import CalendarViewSelector from "./topbar/CalendarViewSelector";
import DatePicker from "./topbar/DatePicker";
import { useState } from "react";

export default function TopBar() {
	return (
		<div className="flex w-full flex-grow-0 flex-row items-center justify-around">
			<DatePicker />
			<CalendarViewSelector />
			<AddEventButton />
		</div>
	);
}
