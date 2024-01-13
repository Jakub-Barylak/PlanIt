import HourCell from "./HourCell";

export default function Timeline() {
	const hours = [...Array(24)].map((_, i) => i);
	return (
		<div className="flex flex-shrink flex-col bg-[#f6f7f999]">
			<div className="flex h-[3.25rem] justify-center "></div>
			<div className="grid flex-1 grid-rows-288">
				<div
					style={{
						gridRowStart: "1",
						gridRowEnd: "288",
					}}
				></div>
				{hours.map((hour) => {
					return <HourCell key={hour} hour={hour} />;
				})}
			</div>
		</div>
	);
}
