"use client";

import clsx from "clsx";
import { useContext } from "react";
import {
	CalendarViewContext,
	CalendarViewContextType,
} from "@/providers/CalendarProvider";
import { View } from "@/lib/types";

type CalendarViewSelectorButtonProps = {
	viewName: View;
	children: string;
};

export default function CalendarViewSelectorButton(
	props: CalendarViewSelectorButtonProps,
) {
	const handleClick = () => {
		context.setView(props.viewName);

		switch (props.viewName) {
			case "day":
				context.setNumberOfDays(1);
				break;
			case "3day":
				context.setNumberOfDays(3);
				break;
			case "week":
				context.setNumberOfDays(7);
				break;
		}
	};

	const context = useContext(CalendarViewContext) as CalendarViewContextType;
	return (
		<div
			onClick={handleClick}
			className={clsx({
				"mx-2 cursor-pointer rounded-2xl px-4": true,
				"bg-[#BEC0F2] px-4": context.view === props.viewName,
			})}
		>
			{props.children}
		</div>
	);
}
