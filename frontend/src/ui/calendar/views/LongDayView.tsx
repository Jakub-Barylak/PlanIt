import { useContext } from "react";
import {
	CalendarViewContext,
	CalendarViewContextType,
} from "@/app/calendar/page";
import EventDisplay from "./EventDisplay";
type LongDayViewProps = {
	n: number;
};

export default function LongDayView(props: LongDayViewProps) {
	// const hours = [...Array(24)].map((_, i) => i + ":00");
	const { calendars } = useContext(
		CalendarViewContext,
	) as CalendarViewContextType;

	let filteredEvents = calendars[0]?.events?.filter((event) => {
		return event.begin_date.includes("2023-12-20");
	});
	// console.log(calendars[0]);
	// console.log(filteredEvents);

	return (
		<div className="flex flex-1 flex-col bg-gray-200 outline outline-1 outline-black">
			<div className="flex h-16 justify-center border-b-2 border-dashed border-b-black">
				{props.n}
			</div>
			<div className="grid flex-1 grid-rows-288">
				<div
					style={{
						gridRowStart: 0,
						gridRowEnd: "288",
						// gridRow: `${rowStart} / span ${rowSpan}`,
						// backgroundColor: "red",
					}}
				></div>
				{props.n === 1
					? filteredEvents?.map((event) => {
							return <EventDisplay event={event} key={event.id} />;
						})
					: ""}
			</div>
		</div>
	);
}
