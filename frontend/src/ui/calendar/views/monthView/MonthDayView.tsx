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
	return (
		<>
			<div
				className="h-full w-full bg-white/60 p-3"
				// className={`flex flex-col p-2 ${props.className}`}
			>
				<div
					className={`text-right ${
						props.month !== props.date.getMonth() + 1
							? "text-lightMode-secondary-text"
							: "text-black"
					}`}
				>
					{props.date.getDate()}
				</div>
				<div className="grid grid-cols-1 gap-0.5">
					{props.events
						.sort((a, b) => {
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
									key={e.event.id}
								/>
							);
						})}
				</div>
			</div>
		</>
	);
}
