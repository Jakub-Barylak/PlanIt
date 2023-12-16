import LongDayView from "./LongDayView";
import Timeline from "./Timeline";
type DaysViewProps = {
	days: number;
};

export default function DaysView(props: DaysViewProps) {
	return (
		<>
			<Timeline />
			{[...Array(props.days)].map((_, i) => {
				return <LongDayView key={i} n={i + 1} />;
			})}
		</>
	);
}
