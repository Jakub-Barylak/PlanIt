type LongDayViewProps = {
	n: number;
};

export default function LongDayView(props: LongDayViewProps) {
	const hours = [...Array(24)].map((_, i) => i + ":00");

	return (
		<div className="flex flex-1 flex-col bg-gray-200 outline outline-1 outline-black">
			<div className="flex h-16 justify-center border-b-2 border-dashed border-b-black">
				{props.n}
			</div>
			<div className="grid-rows-288 grid flex-1">
				<div className="row-[span_12_/_span_12] row-start-[85] bg-red-500">
					Elo
				</div>
			</div>
		</div>
	);
}
