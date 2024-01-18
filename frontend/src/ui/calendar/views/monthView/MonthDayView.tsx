import type { Event, EventColor } from "@/lib/types";
import { DateTime } from "luxon";
import EventView from "./EventView";

type MonthDayViewProps = {
	date: Date;
	events: EventColor[];
	className?: string;
	month: number;
};

export default function MonthView(props: MonthDayViewProps) {
	// if (props.events.length > 0) console.log(props.events);
	return (
		<>
			<div className="bg-lightMode-calendar-bg h-full w-full p-3">
				<div
					className={`text-right ${
						props.month !== props.date.getMonth() + 1
							? "text-light-purple"
							: "text-black"
					}`}
				>
					{props.date.getDate()}
				</div>
				<div className="grid grid-cols-1 gap-0.5 overflow-y-auto">
					{props.events
						.sort((a, b) => {
							if (a.day != null && b.day != null) {
								return a.day - b.day;
							} else if (a.day != null) {
								return -1;
							} else if (b.day != null) {
								return 1;
							}
							return (
								DateTime.fromISO(a.event.begin_date).toMillis() -
								DateTime.fromISO(b.event.begin_date).toMillis()
							);
						})
						.map((e) => {
							return (
								<EventView
									event={e.event}
									color={e.color === "#000000" ? null : e.color}
									day={e.day}
									key={crypto.randomUUID()}
								/>
							);
						})}
				</div>
			</div>
		</>
	);
}
