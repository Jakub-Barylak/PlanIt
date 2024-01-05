import type { Event } from "@/lib/types";
import { DateTime } from "luxon";

type MonthDayViewProps = {
	date: Date;
	events: Event[];
	className?: string;
};

export default function MonthView(props: MonthDayViewProps) {
	return (
		<>
			<div
			// className={`flex flex-col p-2 ${props.className}`}
			>
				<div
				// className={` flex h-8 w-8 items-center justify-center text-center ${
				// 	props.date.toLocaleDateString() == new Date().toLocaleDateString()
				// 		? "rounded-full bg-blue-500 text-white"
				// 		: ""
				// }`}
				>
					{props.date.getDate()}
				</div>
				<div>
					{props.events
						.sort((a, b) => {
							return (
								DateTime.fromISO(a.begin_date).toMillis() -
								DateTime.fromISO(b.begin_date).toMillis()
							);
						})
						.map((event) => {
							console.log(event);
							return (
								<div
								// className="flex place-content-between text-xs"
								>
									<p
									// className="overflow-hidden"
									>
										{event.name}
									</p>
									<p>
										{DateTime.fromISO(event.begin_date).toLocaleString(
											DateTime.TIME_SIMPLE,
										)}
									</p>
								</div>
							);
						})}
				</div>
			</div>
		</>
	);
}
