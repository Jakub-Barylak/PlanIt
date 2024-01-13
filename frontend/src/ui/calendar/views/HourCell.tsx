type HourCellProps = {
	hour: number;
};

export default function HourCell(props: HourCellProps) {
	const rowStart = 1 + props.hour * 12;
	return (
		<div
			className="flex min-h-[4rem] justify-center"
			style={{
				gridRow: `${rowStart} / span 12`,
			}}
		>
			{props.hour + ":00"}
		</div>
	);
}
