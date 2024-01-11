import CVSButton from "./CalendarViewSelectorButton";
import { DateTime } from "luxon";

type CalendarViewSelectorProps = {
	setStartDate: (date: DateTime) => void;
	setNumberOfDays: (days: number) => void;
};

export default function CalendarViewSelector() {
	return (
		<div className="flex h-fit flex-row rounded-2xl bg-indigo-100 p-2">
			<CVSButton viewName="day">Day</CVSButton>
			<CVSButton viewName="3day">3-Days</CVSButton>
			<CVSButton viewName="week">Week</CVSButton>
			<CVSButton viewName="month">Month</CVSButton>
			<CVSButton viewName="year">Year</CVSButton>
		</div>
	);
}
