"use client";

import React, { useState, useContext, useEffect } from "react";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import {
	CalendarViewContext,
	CalendarViewContextType,
} from "@/providers/CalendarProvider";
import { Calendar } from "@/lib/types";
import AddFormRepeat from "./AddFormRepeat";

export default function AddForm() {
	const { calendars } = useContext(
		CalendarViewContext,
	) as CalendarViewContextType;
	const { axios } = useContext(AuthContext) as AuthContextType;

	const [formState, setFormState] = useState({
		name: "",
		begin_date: "",
		end_date: "",
		calendar: calendars[0]?.id ?? "",
		description: "",
		repeated: false,
	});
	const [activeAddButton, setActiveAddButton] = useState(false);
	const [repeatedValues, setRepeatedValues] = useState({});

	const handleChange = (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
			| React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		const name = event.target.name;
		const value = event.target.value;
		if (
			event.target instanceof HTMLInputElement &&
			event.target.type === "checkbox"
		) {
			setFormState({ ...formState, [name]: event.target.checked });
		} else {
			setFormState({ ...formState, [name]: value });
		}
		console.log(formState);
	};

	useEffect(() => {
		if (
			formState.name &&
			formState.begin_date &&
			formState.end_date &&
			formState.calendar
		) {
			setActiveAddButton(true);
		}
	}, [formState]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log("Tutaj");
		let formData = { ...formState };
		if (formState.repeated) {
			formData = { ...formData, ...repeatedValues };
		}
		//console.log(formData);
		axios
			.post("/events/", { ...formData })
			.then((response) => {
				// TODO : update calendar
				alert("Event added");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="absolute -right-2 top-6">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col flex-nowrap bg-red-500 p-2"
			>
				<label htmlFor="name">Name:</label>
				<input type="text" name="name" id="name" onChange={handleChange} />
				<label htmlFor="begin_date">Begin date</label>
				<input
					type="datetime-local"
					name="begin_date"
					id="begin_date"
					onChange={handleChange}
				/>
				<label htmlFor="end_date">End date</label>
				<input
					type="datetime-local"
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
				<label htmlFor="description">Description</label>
				<textarea name="description" id="description" onChange={handleChange} />
				<label htmlFor="repeated">
					Repeated{" "}
					<input
						type="checkbox"
						name="repeated"
						id="repeated"
						onChange={handleChange}
					/>{" "}
				</label>
				<AddFormRepeat
					visible={formState.repeated}
					setRepeatedValues={setRepeatedValues}
				/>
				<button
					type="submit"
					disabled={!activeAddButton}
					className="disabled:text-gray-500"
				>
					Add
				</button>
			</form>
		</div>
	);
}
