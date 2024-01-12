import { DateTime } from "luxon";
import LongDayView from "./LongDayView";
import Timeline from "./Timeline";
type DaysViewProps = {
	days: number;
	start: DateTime;
};

export default function DaysView(props: DaysViewProps) {
	return (
		<>
			<Timeline />
			{[...Array(props.days)].map((_, i) => {
				return <LongDayView key={i} n={props.start.plus({ days: i })} />;
			})}
		</>
	);
}
