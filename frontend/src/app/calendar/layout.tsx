"use client";

import { SideNav } from "@/ui/Sidebar/SideNav";
import DailyPlanner from "@/ui/DailyPlanner";

export default function CalendarLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-screen w-full">
			<SideNav />
			{children}
			<DailyPlanner />
		</div>
	);
}
