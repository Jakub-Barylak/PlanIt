import { View } from "@/lib/types";
import { DateTime } from "luxon";
import parse from "html-react-parser";

type DisplayDateProps = {
	start: DateTime;
	end: DateTime;
	view: View;
};

export default function DisplayDate(props: DisplayDateProps) {
	if (props.view === "day") {
		return props.start.toLocaleString(DateTime.DATE_FULL);
	} else if (props.view === "3day" || props.view === "week") {
		const startString = props.start.toLocaleString(DateTime.DATE_FULL, {
			locale: "pl",
		});
		const endString = props.end.toLocaleString(DateTime.DATE_FULL, {
			locale: "pl",
		});
		return parse(`${startString}<br>${endString}`);
		// return `${props.start.day} ${props.start.monthLong} ${props.start.year} - ${props.end.day} ${props.end.monthLong} ${props.end.year}`;
	} else if (props.view === "month") {
		return props.start.monthLong + " " + props.start.year;
	} else if (props.view === "year") {
		return props.start.year;
	}
}
