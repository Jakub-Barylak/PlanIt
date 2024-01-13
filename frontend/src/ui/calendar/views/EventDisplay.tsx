"use client";
import { Event } from "@/lib/types";
import { DateTime } from "luxon";

export default function EventDisplay({
	event,
	color,
}: {
	event: Event;
	color: string;
}) {
	const startDate = DateTime.fromISO(event.begin_date);
	const endDate = DateTime.fromISO(event.end_date);
	const duration = endDate.diff(startDate);
	const rowStart = 1 + (startDate.hour - 1) * 12 + startDate.minute / 5;
	const rowSpan = duration.as("minutes") / 5;

	// const tailwindRowStart = `row-start-[${rowStart}]`;
	// const tailwindRowSpan = `row-[${rowStart}_/_span_${rowSpan}]`;
	// const tailwindStyles = clsx(tailwindRowStart, tailwindRowSpan, "bg-red-500");
	// console.log(tailwindStyles);
	const startTime = DateTime.fromISO(event.begin_date)
		.minus({ hour: 1 })
		.toLocaleString(DateTime.TIME_24_SIMPLE);
	const endTime = DateTime.fromISO(event.end_date)
		.minus({ hour: 1 })
		.toLocaleString(DateTime.TIME_24_SIMPLE);
	return (
		<div
			className="rounded-xl px-3"
			style={{
				gridRow: `${rowStart} / span ${rowSpan}`,
				backgroundColor: color === "#000000" ? "#150F6366" : color,
			}}
		>
			<div className="h-6 w-28 truncate whitespace-nowrap">{event.name}</div>
			<div>
				{startTime} - {endTime}
			</div>
		</div>
	);
}
