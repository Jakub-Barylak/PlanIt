"use client";

import { SideNav } from "@/ui/Sidebar/SideNav";
import DailyPlanner from "@/ui/DailyPlanner";
import { NextUIProvider } from "@nextui-org/system";

export default function CalendarLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<NextUIProvider>
			<div className="flex h-screen w-full">
				<SideNav />
				{children}
				<DailyPlanner />
			</div>
		</NextUIProvider>
	);
}
