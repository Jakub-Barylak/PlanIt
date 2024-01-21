"use client";
import { Event } from "@/lib/types";
import { DateTime } from "luxon";
import Link from "next/link";
import { useLayoutEffect } from "react";
import W3CtextColor from "../W3CtextColor";

export default function EventDisplay({
	event,
	color,
	calendarId,
	date,
}: {
	event: Event;
	color: string;
	calendarId: string;
	date: DateTime;
}) {
	const startDate = DateTime.fromISO(event.begin_date);
	const endDate = DateTime.fromISO(event.end_date);
	const duration = endDate.diff(startDate);
	let rowStart = 1 + (startDate.hour - 1) * 12 + startDate.minute / 5;
	let rowSpan = duration.as("minutes") / 5;

	if (startDate.day !== date.day) {
		rowStart = 1;
		if (endDate.day !== date.day) {
			rowSpan = 288;
		} else {
			rowSpan = 1 + (endDate.hour - 1) * 12 + endDate.minute / 5;
		}
	}

	const textColor: string = W3CtextColor(color);

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
				color: textColor,
			}}
		>
			<Link href={`/calendar/${calendarId}/${event.id}`}>
				<div className="h-6 w-28 truncate whitespace-nowrap">{event.name}</div>
				<div>
					{startTime} - {endTime}
				</div>
			</Link>
		</div>
	);
}
