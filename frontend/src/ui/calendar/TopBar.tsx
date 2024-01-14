import AddEventButton from "./topbar/AddEventButton";
import CalendarViewSelector from "./topbar/CalendarViewSelector";
import DatePicker from "./topbar/DatePicker";

export default function TopBar() {
	return (
		<div className="mx-10 mt-4 grid min-h-[3rem] grid-cols-[1fr_2fr_min(10vh,10vw)] items-center justify-around gap-20">
			<DatePicker />
			<CalendarViewSelector />
			<AddEventButton />
		</div>
	);
}
