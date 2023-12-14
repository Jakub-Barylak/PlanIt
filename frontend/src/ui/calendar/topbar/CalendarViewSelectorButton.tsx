"use client";

import clsx from "clsx";
import { useContext } from "react";
import {
	CalendarViewContext,
	CalendarViewContextType,
} from "@/app/calendar/page";

type CalendarViewSelectorButtonProps = { viewName: string; children: string };

export default function CalendarViewSelectorButton(
	props: CalendarViewSelectorButtonProps,
) {
	const context = useContext(CalendarViewContext) as CalendarViewContextType;
	return (
		<div
			onClick={() => context.setView(props.viewName)}
			className={clsx({
				"mx-2 cursor-pointer rounded-2xl px-4": true,
				"bg-indigo-300 px-4": context.view === props.viewName,
			})}
		>
			{props.children}
		</div>
	);
}
