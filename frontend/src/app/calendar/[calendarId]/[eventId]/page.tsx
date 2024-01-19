"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { DateTime } from "luxon";
import { RiDeleteBin6Line } from "react-icons/ri";

import {
	CalendarViewContext,
	CalendarViewContextType,
} from "@/providers/CalendarProvider";
import EditableCell from "@/ui/EventDetails/EditableCell";

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

	const [eventDetails, setEventDetails] = useState(event);

	const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (eventDetails === undefined) return;
		console.log({ value: event.target.value, name: event.target.name });
		if (
			event.target.name === "begin_date" ||
			event.target.name === "end_date"
		) {
			setEventDetails({
				...eventDetails,
				[event.target.name]:
					DateTime.fromISO(event.target.value).toISO({
						includeOffset: false,
						suppressMilliseconds: true,
					}) + "Z",
			});
		} else {
			setEventDetails({
				...eventDetails,
				[event.target.name]: event.target.value,
			});
		}
	};

	if (calendars.length === 0) {
		return "Loading...";
	} else if (event === undefined || eventDetails === undefined) {
		return "Event not found :(";
	}

	const changed: boolean = !(
		event.name === eventDetails.name &&
		event.description === eventDetails.description &&
		event.begin_date === eventDetails.begin_date &&
		event.end_date === eventDetails.end_date
	);

	return (
		<div className="m-10 flex-grow">
			<div className="mx-20 grid grid-cols-4 grid-rows-[repeat(5,auto)] gap-8 rounded-2xl border-2 border-solid border-[#757575] p-2">
				<h1 className="col-start-1 col-end-3 text-4xl">Event details</h1>
				<div className="col-start-3 col-end-5 flex items-center justify-end">
					<div className="cursor-pointer text-4xl">
						<RiDeleteBin6Line />
					</div>
				</div>
				<div className="col-start-1 col-end-3">
					<h2 className="my-3 text-xl">Name</h2>
					{/* <p className="rounded-2xl border-2 border-solid border-[#C4C4C4] p-2 text-[#A0A0A0]">
						{event?.name}
					</p> */}
					<EditableCell
						value={eventDetails.name}
						name="name"
						type="text"
						onChange={onChangeHandler}
					/>
				</div>
				<div className="col-start-1 col-end-5 row-start-3 row-end-4">
					<h2 className="my-3 text-xl">Description</h2>
					{/* <p className="rounded-2xl border-2 border-solid border-[#C4C4C4] p-2 text-[#A0A0A0]">
						{event?.description || "No description"}
					</p> */}
					<EditableCell
						value={eventDetails.description}
						name="description"
						type="text"
						onChange={onChangeHandler}
					/>
				</div>
				<div className="col-start-1 col-end-3 row-start-4 row-end-5">
					<h2 className="my-3 text-xl">Begin Date</h2>
					{/* <p className="rounded-2xl border-2 border-solid border-[#C4C4C4] p-2 text-[#A0A0A0]">
						{event?.begin_date}
					</p> */}
					<EditableCell
						value={eventDetails.begin_date}
						name="begin_date"
						type="datetime-local"
						onChange={onChangeHandler}
					/>
				</div>
				<div className="col-start-3 col-end-5 row-start-4 row-end-5">
					<h2 className="my-3 text-xl">End Date</h2>
					{/* <p className="rounded-2xl border-2 border-solid border-[#C4C4C4] p-2 text-[#A0A0A0]">
						{event?.end_date}
					</p> */}
					<EditableCell
						value={eventDetails.end_date}
						name="end_date"
						type="datetime-local"
						onChange={onChangeHandler}
					/>
				</div>
				{changed ? (
					<>
						<div className="col-start-1 col-end-3 row-start-5 row-end-6 m-6 flex cursor-pointer items-center justify-center rounded-2xl bg-[#C4C4C4] py-3 hover:bg-[#BEC0F2]">
							<div className="text-center text-xl">Save</div>
						</div>
						<Link
							href="/calendar"
							className="col-start-3 col-end-5 row-start-5 row-end-6 m-6 flex items-center justify-center rounded-2xl bg-[#C4C4C4] py-3 hover:bg-[#BEC0F2]"
						>
							<div className="text-center text-xl">Close</div>
						</Link>
					</>
				) : (
					<Link
						href="/calendar"
						className="col-start-2 col-end-4 row-start-5 row-end-6 m-6 flex items-center justify-center rounded-2xl bg-[#C4C4C4] py-3 hover:bg-[#BEC0F2]"
					>
						<div className="text-center text-xl">Close</div>
					</Link>
				)}
			</div>
		</div>
	);
}
