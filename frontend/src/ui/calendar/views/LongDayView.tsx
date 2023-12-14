type LongDayViewProps = {
	n: number;
};

export default function LongDayView(props: LongDayViewProps) {
	return (
		<div className="flex-1 bg-gray-200 outline outline-1 outline-black">
			{props.n}
		</div>
	);
}
