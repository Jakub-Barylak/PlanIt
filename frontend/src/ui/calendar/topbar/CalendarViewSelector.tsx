import CVSButton from "./CalendarViewSelectorButton";

export default function CalendarViewSelector() {
	return (
		<div className="grid h-full grid-cols-5 justify-stretch rounded-xl bg-[#DCDDE9] p-2 text-center">
			<CVSButton viewName="day">Day</CVSButton>
			<CVSButton viewName="3day">3-Days</CVSButton>
			<CVSButton viewName="week">Week</CVSButton>
			<CVSButton viewName="month">Month</CVSButton>
			<CVSButton viewName="year">Year</CVSButton>
		</div>
	);
}
