"use client";

import { SideNav } from "@/ui/SideNav";
import DailyPlanner from "@/ui/DailyPlanner";

export default function CalendarLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex max-h-full w-full">
			<SideNav />
			{children}
			<DailyPlanner />
		</div>
	);
}
