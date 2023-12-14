import LongDayView from "./LongDayView";

type DaysViewProps = {
	days: number;
};

export default function DaysView(props: DaysViewProps) {
	return (
		<>
			{[...Array(props.days)].map((_, i) => {
				return <LongDayView key={i} n={i + 1} />;
			})}
		</>
	);
}
