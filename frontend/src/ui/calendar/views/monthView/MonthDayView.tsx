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
			<div className="grid h-full w-full grid-rows-[auto_1fr] bg-lightMode-calendar-bg  p-3 light:text-black dark:bg-darkMode-background ">
				<div
					className={`text-right ${
						props.month !== props.date.getMonth() + 1
							? "text-light-purple"
							: "light:text-black"
					}`}
				>
					{props.date.getDate()}
				</div>
				<div className="h-full overflow-y-auto">
					<div className="grid h-min grid-cols-1 gap-0.5">
						{props.events
							.sort((a, b) => {
								if (a.day != null && b.day != null) {
									return b.day - a.day;
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
										color={e.color}
										day={e.day}
										key={crypto.randomUUID()}
									/>
								);
							})}
					</div>
				</div>
			</div>
		</>
	);
}
