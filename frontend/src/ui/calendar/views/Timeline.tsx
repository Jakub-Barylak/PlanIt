import HourCell from "./HourCell";

export default function Timeline() {
	const hours = [...Array(24)].map((_, i) => i);
	return (
		<div className="flex flex-shrink flex-col bg-gray-200 outline outline-1 outline-black">
			<div className="flex h-16 justify-center border-b-2 border-dashed border-b-black"></div>
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
