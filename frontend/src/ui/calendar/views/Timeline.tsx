import HourCell from "./HourCell";

export default function Timeline() {
	const hours = [...Array(24)].map((_, i) => i + ":00");
	return (
		<div className="flex-shrink bg-gray-200 outline outline-1 outline-black">
			{["", ...hours].map((hour) => {
				return <HourCell key={hour} hour={hour} />;
			})}
		</div>
	);
}
