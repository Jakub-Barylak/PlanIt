type LongDayViewProps = {
	n: number;
};

export default function LongDayView(props: LongDayViewProps) {
	const hours = [...Array(24)].map((_, i) => i + ":00");

	return (
		<div className="flex-1 bg-gray-200 outline outline-1 outline-black">
			<div className="flex h-16 justify-center border-b-2 border-dashed border-b-black">
				{props.n}
			</div>
			{hours.map((hour) => {
				return (
					<div
						key={hour}
						className="flex h-16 justify-center border-b-2 border-dashed border-b-black"
					></div>
				);
			})}
		</div>
	);
}
