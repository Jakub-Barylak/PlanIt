import { Event } from "@/lib/types";
import { DateTime } from "luxon";
import { useContext } from "react";

type EventViewProps = {
	event: Event;
	color?: string | null;
};

export default function EventView(props: EventViewProps) {
	console.log(props.event, props.color);
	const color = props.color ?? "#ffffff";
	return (
		<div
			className={`py-1/2 grid grid-cols-[min-content_minmax(0,1fr)] gap-x-1 overflow-y-auto rounded-md px-2 text-sm `}
			style={{ backgroundColor: `${color}` }} // Tailwind generuje klasy. Musi tak być!
		>
			<div>
				<p>
					{DateTime.fromISO(props.event.begin_date).toLocaleString(
						DateTime.TIME_SIMPLE,
					)}
				</p>
			</div>
			<div>
				<p className="overflow-hidden truncate text-right">
					{props.event.name}
				</p>
			</div>
		</div>
	);
}
