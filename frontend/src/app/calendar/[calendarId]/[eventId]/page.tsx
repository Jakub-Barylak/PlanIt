"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse } from "axios";

import {
	CalendarViewContext,
	CalendarViewContextType,
} from "@/providers/CalendarProvider";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import EditableCell from "@/ui/EventDetails/EditableCell";
import EditAllRepeatedEventsDialog from "@/ui/EventDetails/EditAllRepeatedEventsDialog";

type EventDetailsProps = {
	params: {
		calendarId: string;
		eventId: string;
	};
};

export default function EventDetails(props: EventDetailsProps) {
	const { calendars, deleteEvent, editEvent, forceRefresh } = useContext(
		CalendarViewContext,
	) as CalendarViewContextType;
	const { axios } = useContext(AuthContext) as AuthContextType;

	const findEvent = () => {
		return calendars
			.find((cal) => cal.id === Number(props.params.calendarId))
			?.events?.find((event) => event.id === Number(props.params.eventId));
	};

	const findCalendar = () => {
		return calendars.find((cal) => cal.id === Number(props.params.calendarId));
	};

	const router = useRouter();
	const event = findEvent();
	const calendar = findCalendar();

	useEffect(() => {
		const event = findEvent();
		setEventDetails(event);
	}, [calendars]);

	const [eventDetails, setEventDetails] = useState(event);
	const [isOpen, setOpen] = useState(false);

	const onChangeHandler = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
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

	const handleDeleteEvent = () => {
		const result = confirm("Are you sure you want to delete this event?");
		if (result === false) return;
		toast.info("Deleting event...");
		axios
			.delete("/events/delete-event/", {
				data: {
					eventId: event!.id,
					repeated: event!.template !== null,
				},
			})
			.then((res: AxiosResponse) => {
				if (res.status === 204) {
					toast.success("Event deleted successfully");
					deleteEvent(
						parseInt(props.params.calendarId),
						parseInt(props.params.eventId),
					);
					if (event!.template !== null) {
						forceRefresh();
					}
					router.push("/calendar");
				}
			})
			.catch((error: AxiosError) => {
				toast.error("Something went wrong while deleting event :(");
			});
	};

	const handleEditEvent = () => {
		if (eventDetails?.template !== null) {
			setOpen(true);
		} else {
			sendEditRequest();
		}
	};

	const sendEditRequest = (editAll: boolean = false) => {
		toast.info("Updating event...");
		console.log({
			name: eventDetails?.name,
			description: eventDetails?.description,
			begin_date: eventDetails?.begin_date,
			end_date: eventDetails?.end_date,
			calendar: props.params.calendarId,
			repeated: editAll,
		});
		axios
			.patch(`/events/${eventDetails?.id}/`, {
				name: eventDetails?.name,
				description: eventDetails?.description,
				begin_date: eventDetails?.begin_date,
				end_date: eventDetails?.end_date,
				calendar: props.params.calendarId,
				repeated: editAll,
			})
			.then((res: AxiosResponse) => {
				editEvent(parseInt(props.params.calendarId), res.data);
				toast.success("Event updated successfully");
			})
			.catch((error: AxiosError) => {
				toast.error("Something went wrong while updating event :(");
			});
	};

	if (calendars.length === 0) {
		return <div className="h-screen">Loading...</div>;
	} else if (event === undefined || eventDetails === undefined) {
		return (
			<div className="flex h-screen flex-grow flex-col items-center justify-center pb-40 font-medium">
				<div className="mb-12 text-3xl">
					We couldn't find what you were looking for ¯\_(ツ)_/¯
				</div>
				<Link
					href="/calendar"
					className="rounded-2xl bg-[#C4C4C4] p-6 py-3 transition-colors hover:bg-[#BEC0F2]"
				>
					Go back to calendar
				</Link>
			</div>
		);
	}

	const changed: boolean = !(
		event.name === eventDetails.name &&
		event.description === eventDetails.description &&
		event.begin_date === eventDetails.begin_date &&
		event.end_date === eventDetails.end_date
	);
	const canEdit =
		calendar?.shared === false ||
		(calendar.shared === true && calendar.coworked === true);

	return (
		<div className="h-screen flex-grow overflow-x-auto px-10 pt-10">
			<div className="mx-20 grid grid-cols-4 grid-rows-[repeat(5,auto)] gap-4 rounded-2xl border-2 border-solid border-[#757575] p-2">
				<h1
					className="col-start-1 col-end-3 text-4xl"
					onClick={() => {
						toast.info("Test");
					}}
				>
					Event details
					{canEdit && (
						<p className="text-sm text-[#A0A0A0]">
							Double click any element to edit
						</p>
					)}
				</h1>
				<div className="col-start-3 col-end-5 flex items-center justify-end">
					<div className="cursor-pointer text-4xl" onClick={handleDeleteEvent}>
						<RiDeleteBin6Line />
					</div>
				</div>
				<div className="col-start-1 col-end-3">
					<h2 className="my-3 text-xl">Name</h2>
					<EditableCell
						value={eventDetails.name}
						name="name"
						type="text"
						onChange={onChangeHandler}
						canEdit={canEdit}
					/>
				</div>
				<div className="col-start-3 col-end-4">
					<h2 className="my-3 text-xl">Repeated</h2>
					<p className="rounded-2xl border-2 border-solid border-[#C4C4C4] p-2 text-[#A0A0A0]">
						{eventDetails.template !== null ? "Yes" : "No"}
					</p>
				</div>
				<div className="col-start-1 col-end-5 row-start-3 row-end-4">
					<h2 className="my-3 text-xl">Description</h2>
					<EditableCell
						value={eventDetails.description || ""}
						name="description"
						type="textarea"
						onChange={onChangeHandler}
						canEdit={canEdit}
					/>
				</div>
				<div className="col-start-1 col-end-3 row-start-4 row-end-5">
					<h2 className="my-3 text-xl">Begin Date</h2>
					<EditableCell
						value={eventDetails.begin_date}
						name="begin_date"
						type="datetime-local"
						onChange={onChangeHandler}
						canEdit={canEdit}
					/>
				</div>
				<div className="col-start-3 col-end-5 row-start-4 row-end-5">
					<h2 className="my-3 text-xl">End Date</h2>
					<EditableCell
						value={eventDetails.end_date}
						name="end_date"
						type="datetime-local"
						onChange={onChangeHandler}
						canEdit={canEdit}
					/>
				</div>
				{changed ? (
					<>
						<div
							className="col-start-1 col-end-3 row-start-5 row-end-6 m-6 flex cursor-pointer items-center justify-center rounded-2xl bg-[#C4C4C4] py-3 transition-colors hover:bg-[#BEC0F2]"
							onClick={handleEditEvent}
						>
							<div className="text-center text-xl">Save</div>
						</div>
						<Link
							href="/calendar"
							className="col-start-3 col-end-5 row-start-5 row-end-6 m-6 flex items-center justify-center rounded-2xl bg-[#C4C4C4] py-3 transition-colors hover:bg-[#BEC0F2]"
						>
							<div className="text-center text-xl">Close</div>
						</Link>
					</>
				) : (
					<Link
						href="/calendar"
						className="col-start-2 col-end-4 row-start-5 row-end-6 m-6 flex items-center justify-center rounded-2xl bg-[#C4C4C4] py-3 transition-colors hover:bg-[#BEC0F2]"
					>
						<div className="text-center text-xl">Close</div>
					</Link>
				)}
			</div>
			<EditAllRepeatedEventsDialog
				isOpen={isOpen}
				setOpen={setOpen}
				sendRequest={sendEditRequest}
			/>
		</div>
	);
}
