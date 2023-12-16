type HourCellProps = {
	hour?: string;
};

export default function HourCell(props: HourCellProps) {
	return (
		<div className="flex h-16 justify-center border-b-2 border-dashed border-b-black">
			{props.hour}
		</div>
	);
}
