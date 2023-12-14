import { DateTime } from "luxon";
export default function DatePicker() {
	const now = DateTime.now();
	return (
		<div>
			{now.day} {now.monthLong} {now.year}
		</div>
	);
}
