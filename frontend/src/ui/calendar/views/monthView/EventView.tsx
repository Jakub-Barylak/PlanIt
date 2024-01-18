import { Event } from "@/lib/types";
import { DateTime } from "luxon";
import Link from "next/link";
import { useContext, useLayoutEffect, useState } from "react";

type EventViewProps = {
	event: Event;
	color?: string | null;
	day: number | null;
};

export default function EventView(props: EventViewProps) {
	const color = props.color ?? "#ffffff";
	const [textColor, setTextColor] = useState("#000000");

	useLayoutEffect(() => {
		const textColor = () => {
			const r = parseInt(color.slice(1, 3), 16);
			const g = parseInt(color.slice(3, 5), 16);
			const b = parseInt(color.slice(5, 7), 16);
			const brightness = (r * 299 + g * 587 + b * 114) / 1000;
			return brightness >= 128 ? "#000000" : "#ffffff";
		};
		setTextColor(textColor);
	}, []);

	return (
		<Link href={`/calendar/${props.event.calendar}/${props.event.id}`}>
			<div
				className={`py-1/2 grid grid-cols-[auto_minmax(0,1fr)] gap-x-1 overflow-y-auto rounded-md px-2 text-sm`}
				style={{ backgroundColor: `${color}`, color: `${textColor}` }} // Tailwind generuje klasy. Musi tak być!
			>
				<div>
					<p className={`${props.day !== null ? "font-semibold" : ""}`}>
						{props.day != null
							? "Day " + props.day
							: (DateTime.fromISO(props.event.begin_date).toLocaleString(
									DateTime.TIME_SIMPLE,
								) as string)}
					</p>
				</div>
				<div>
					<p
						className={`overflow-hidden truncate text-right ${
							props.day !== null ? "underline" : ""
						}`}
					>
						{props.event.name}
					</p>
				</div>
			</div>
		</Link>
	);
}
