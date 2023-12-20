"use client";
import { Event } from "@/lib/types";
import clsx from "clsx";
import { DateTime } from "luxon";

export default function EventDisplay({ event }: { event: Event }) {
	const startDate = DateTime.fromISO(event.begin_date);
	const endDate = DateTime.fromISO(event.end_date);
	const duration = endDate.diff(startDate);
	const rowStart = 1 + (startDate.hour - 1) * 12 + startDate.minute / 5;
	const rowSpan = duration.as("minutes") / 5;

	// const tailwindRowStart = `row-start-[${rowStart}]`;
	// const tailwindRowSpan = `row-[${rowStart}_/_span_${rowSpan}]`;
	// const tailwindStyles = clsx(tailwindRowStart, tailwindRowSpan, "bg-red-500");
	// console.log(tailwindStyles);

	return (
		<div
			className="bg-red-600"
			style={{
				gridRow: `${rowStart} / span ${rowSpan}`,
			}}
		>
			{event.name}
			<br />
			{/* {event.begin_date}
			<br />
			{event.end_date}
			<br /> */}
		</div>
	);
	// return <div className={tailwindStyles}>{event.name}</div>;
}
