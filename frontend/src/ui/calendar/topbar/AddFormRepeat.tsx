import { useEffect, useState } from "react";

type AddFormRepeatProps = {
	visible: boolean;
	setRepeatedValues: (values: any) => void;
};

export default function AddFormRepeat(props: AddFormRepeatProps) {
	const [formState, setFormState] = useState({
		every: "day",
		weekday: "0",
		month_day: "",
		year_month_day: "",
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

	useEffect(() => {
		let newValue = {};
		if (formState.every === "week") {
			newValue = { weekday: formState.weekday };
		} else if (formState.every === "month") {
			newValue = { month_day: formState.month_day };
		} else if (formState.every === "year") {
			const month = parseInt(formState.year_month_day.split("-")[1]);
			const month_day = parseInt(formState.year_month_day.split("-")[2]);
			newValue = { month, month_day };
		}

		props.setRepeatedValues({ ...newValue, every: formState.every });
	}, [formState]);

	useEffect(() => {
		props.setRepeatedValues({ every: formState.every });
	}, []);

	return (
		<div
			className="flex flex-col flex-nowrap"
			style={{ display: props.visible ? "flex" : "none" }}
		>
			<label htmlFor="every">Repetition</label>{" "}
			<select name="every" id="every" onChange={handleChange}>
				<option value="day">Daily</option>
				<option value="week">Weekly</option>
				<option value="month">Monthly</option>
				<option value="year">Yearly</option>
			</select>
			{formState.every === "week" && (
				<label htmlFor="weekday">
					Weekday
					<br />
					<select name="weekday" id="weekday" onChange={handleChange}>
						<option value="0">Monday</option>
						<option value="1">Tuesday</option>
						<option value="2">Wednesday</option>
						<option value="3">Thursday</option>
						<option value="4">Friday</option>
						<option value="5">Saturday</option>
						<option value="6">Sunday</option>
					</select>
				</label>
			)}
			{formState.every === "month" && (
				<label htmlFor="month_day">
					Day of the month
					<input
						type="number"
						name="month_day"
						id="month_day"
						min="1"
						max="31"
						onChange={handleChange}
					/>
				</label>
			)}
			{formState.every === "year" && (
				<label htmlFor="year_month_day">
					Date
					<input
						type="date"
						name="year_month_day"
						id="year_month_day"
						onChange={handleChange}
					/>
				</label>
			)}
		</div>
	);
}
