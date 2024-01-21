import { Event } from "@/lib/types";
import { DateTime } from "luxon";
import Link from "next/link";
import { useContext, useLayoutEffect, useState } from "react";
import W3CtextColor from "../W3CtextColor";

type EventViewProps = {
	event: Event;
	color?: string | null | undefined;
	day: number | null;
};

export default function EventView(props: EventViewProps) {
	let color = props.color ?? "#BEC0F2";
	if (!new RegExp(`^#(?:[0-9a-fA-F]{3}){1,2}$`).test(color)) {
		color = "#BEC0F2";
	}
	const [textColor, setTextColor] = useState("#000000");

	//console.log(color);

	useLayoutEffect(() => {
		setTextColor(W3CtextColor(color));
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
