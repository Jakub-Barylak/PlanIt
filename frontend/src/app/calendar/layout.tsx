"use client";

import { SideNav } from "@/ui/Sidebar/SideNav";
import DailyPlanner from "@/ui/DailyPlaner/DailyPlaner";
import { NextUIProvider } from "@nextui-org/system";

export default function CalendarLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<NextUIProvider>
			<div className="grid max-h-screen w-full grid-cols-[auto_minmax(0,1fr)_auto]">
				<SideNav />
				{children}
				<DailyPlanner />
			</div>
		</NextUIProvider>
	);
}
