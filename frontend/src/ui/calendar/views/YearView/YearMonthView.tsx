import { DateTime } from "luxon";

export default function YearMonthView({
	month,
	year,
}: {
	month: number;
	year: number;
}) {
	const date = DateTime.fromObject({ year: year, month: month, day: 1 });
	const firstDayInMonth = new Date(year, month - 1, 1).getDay();
	const daysToAddInFront = firstDayInMonth === 0 ? 6 : firstDayInMonth - 1; // replace with (firstDayInMonth - 1) % 7

	return (
		<div className="grid grid-cols-1 grid-rows-[auto_1fr] gap-2 rounded-xl border-1 p-2 text-lg">
			<div className="justify-center text-center font-bold">
				{date.setLocale("en-en").toFormat("LLL").toUpperCase() + " " + year}
			</div>
			<div className="[&>div:nth-child(7n)]:text-light-purple grid h-full w-full grid-cols-7 grid-rows-[repeat(7,1fr)] text-center text-sm">
				{["M", "T", "W", "T", "F", "S", "S"].map((day, i) => {
					return (
						<div className="px-3 text-center font-semibold" key={i}>
							{day}
						</div>
					);
				})}
				{[...Array(daysToAddInFront)].map((_, i) => {
					return <div key={crypto.randomUUID()}></div>;
				})}
				{[...Array(date.daysInMonth)].map((_, i) => {
					return <div key={crypto.randomUUID()}>{i + 1}</div>;
				})}
				<div className=" col-start-7 row-start-7 h-full"></div>
			</div>
		</div>
	);
}
