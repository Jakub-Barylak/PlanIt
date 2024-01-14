"use client";
import {
	CalendarViewContext,
	CalendarViewContextType,
} from "@/providers/CalendarProvider";
import { useContext } from "react";
import Link from "next/link";
type EventDetailsProps = {
	params: {
		calendarId: string;
		eventId: string;
	};
};

export default function EventDetails(props: EventDetailsProps) {
	const { calendars } = useContext(
		CalendarViewContext,
	) as CalendarViewContextType;

	const event = calendars
		.find((cal) => cal.id === Number(props.params.calendarId))
		?.events?.find((event) => event.id === Number(props.params.eventId));

	return (
		<div className="m-10 flex-grow">
			<div className="grid grid-cols-4 grid-rows-5 gap-8 rounded-2xl border-2 border-solid border-[#757575] p-2">
				<h1 className="col-start-1 col-end-3 text-4xl">Event details</h1>
				<div>Icons</div>
				<div className="col-start-1 col-end-3">
					<h2 className="my-3 text-xl">Name</h2>
					<p className="rounded-2xl border-2 border-solid border-[#C4C4C4] p-2 text-[#A0A0A0]">
						{event?.name}
					</p>
				</div>
				<div className="col-start-1 col-end-5 row-start-3 row-end-4">
					<h2 className="my-3 text-xl">Description</h2>
					<p className="rounded-2xl border-2 border-solid border-[#C4C4C4] p-2 text-[#A0A0A0]">
						{event?.description || "No description"}
					</p>
				</div>
				<div className="col-start-1 col-end-3 row-start-4 row-end-5">
					<h2 className="my-3 text-xl">Begin Date</h2>
					<p className="rounded-2xl border-2 border-solid border-[#C4C4C4] p-2 text-[#A0A0A0]">
						{event?.begin_date}
					</p>
				</div>
				<div className="col-start-3 col-end-5 row-start-4 row-end-5">
					<h2 className="my-3 text-xl">End Date</h2>
					<p className="rounded-2xl border-2 border-solid border-[#C4C4C4] p-2 text-[#A0A0A0]">
						{event?.end_date}
					</p>
				</div>
				<Link
					href="/calendar"
					className="col-start-2 col-end-4 row-start-5 row-end-6 m-6 flex items-center justify-center rounded-2xl bg-[#C4C4C4]"
				>
					<div className="text-center text-xl">Close</div>
				</Link>
			</div>
		</div>
	);
}
