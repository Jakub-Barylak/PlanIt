"use client";

import React, { useState, useContext } from "react";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import {
	CalendarViewContext,
	CalendarViewContextType,
} from "@/app/calendar/page";
import { Calendar } from "@/lib/types";

export default function AddForm() {
	const { calendars } = useContext(
		CalendarViewContext,
	) as CalendarViewContextType;

	const [formState, setFormState] = useState({
		name: "",
		begin_date: "",
		end_date: "",
		calendar: "",
	});

	const handleChange = (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>,
	) => {
		const name = event.target.name;
		const value = event.target.value;
		setFormState({ ...formState, [name]: value });
	};

	const { axios } = useContext(AuthContext) as AuthContextType;

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(formState);
		axios
			.post("/events/", { ...formState })
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col flex-nowrap bg-red-500 p-2"
			>
				<label htmlFor="name">Name:</label>
				<input type="text" name="name" id="name" onChange={handleChange} />
				<label htmlFor="begin_date">Begin date</label>
				<input
					type="datetime-local"
					// type="date"
					name="begin_date"
					id="begin_date"
					onChange={handleChange}
				/>
				<label htmlFor="end_date">End date</label>
				<input
					type="datetime-local"
					// type="date"
					name="end_date"
					id="end_date"
					onChange={handleChange}
				/>
				<label htmlFor="calendar">Calendar</label>
				<select name="calendar" id="calendar" onChange={handleChange}>
					{calendars.map((calendar: Calendar) => {
						return (
							<option value={calendar.id} key={calendar.id}>
								{calendar.name}
							</option>
						);
					})}
				</select>
				<button type="submit">Add</button>
			</form>
		</div>
	);
}
