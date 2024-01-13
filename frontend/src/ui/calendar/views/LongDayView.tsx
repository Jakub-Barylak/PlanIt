import { useContext } from "react";
import {
	CalendarViewContext,
	CalendarViewContextType,
} from "@/providers/CalendarProvider";
import EventDisplay from "./EventDisplay";
import { DateTime } from "luxon";

type LongDayViewProps = {
	n: DateTime;
};

export default function LongDayView(props: LongDayViewProps) {
	const { calendars } = useContext(
		CalendarViewContext,
	) as CalendarViewContextType;

	// let filteredEvents = calendars[0]?.events?.filter((event) => {
	// 	return event.begin_date.includes("2023-12-20");
	// });

	const localizedWeekday = props.n
		.toLocaleString({ weekday: "short" }, { locale: "pl" })
		.replace(".", "");

	return (
		<div className="flex flex-1 flex-col bg-gray-200 outline outline-1 outline-black">
			<div className="flex h-16 flex-col justify-center border-b-2 border-dashed border-b-black">
				<div className="text-center text-[#848585]">
					{localizedWeekday[0].toUpperCase() + localizedWeekday.slice(1)}
				</div>
				<div className="text-center">
					{props.n.toLocaleString({ day: "numeric" }, { locale: "pl" })}
				</div>
			</div>
			<div className="grid flex-1 grid-rows-288">
				<div
					style={{
						gridRowStart: 0,
						gridRowEnd: "288",
					}}
				></div>
				{calendars.map(
					(calendar) =>
						calendar.events?.map((event) => {
							// console.log({
							// 	begin_date: event.begin_date,
							// 	n: props.n.toISODate(),
							// });
							if (event.begin_date.includes(props.n.toISODate() as string)) {
								return (
									<EventDisplay
										event={event}
										key={event.id}
										color={calendar.color}
									/>
								);
							}
						}),
				)}
			</div>
		</div>
	);
}
