import type { Calendar } from "@/lib/types";
import {
	CalendarViewContext,
	CalendarViewContextType,
} from "@/providers/CalendarProvider";
import { Menu, Item, useContextMenu, Separator } from "react-contexify";
import { useContext, useState } from "react";

import "react-contexify/dist/ReactContexify.css";
import { SidebarCalendarViewShareDialog } from "./SidebarCalendarViewShareDialog";
import { SidebarCalendarViewEditCalendarDialog } from "./SidebarCalendarViewEditCalendarDialog";

export const SidebarCalendarComponent = ({
	calendar,
}: {
	calendar: Calendar;
}) => {
	const MENU_ID = ("calendar-menu-" + calendar.id) as string;

	const [menuVisible, setMenuVisible] = useState(false);
	const [shareDialogOpen, setShareDialogOpen] = useState(false);
	const [editDialogOpen, setEditDialogOpen] = useState(false);

	const calendarContext = useContext(
		CalendarViewContext,
	) as CalendarViewContextType;

	const { show } = useContextMenu({
		id: MENU_ID,
	});

	const displayMenu = (e: React.MouseEvent) => {
		e.preventDefault();
		show({
			event: e,
			position: { x: 50, y: 20 },
		});
	};

	return (
		<>
			<label
				key={calendar.id}
				className="relative grid h-8 grid-cols-[minmax(0,1fr)_min-content] items-center justify-between gap-2 rounded-lg px-2 hover:bg-gray-100 dark:hover:bg-[#282A32]"
				onContextMenu={(e) => {
					displayMenu(e);
				}}
			>
				{/* grid grid-cols-[max-content_auto] */}
				<span className="truncate">{calendar.name}</span>
				<input
					type="checkbox"
					className="ml-2 h-4 w-4 bg-gray-200 text-gray-600 accent-slate-600"
					checked={calendar.isVisible}
					onChange={(e) => {
						!menuVisible &&
							calendarContext.toggleCalendarVisibility(calendar.id);
					}}
				/>

				<SidebarCalendarViewShareDialog
					isOpen={shareDialogOpen}
					setOpen={setShareDialogOpen}
					calendar={calendar}
				/>

				<SidebarCalendarViewEditCalendarDialog
					isOpen={editDialogOpen}
					setOpen={setEditDialogOpen}
					calendar={calendar}
				/>

				<Menu
					id={MENU_ID}
					style={{ position: "absolute" }}
					onVisibilityChange={setMenuVisible}
				>
					<Item disabled>{calendar.name}</Item>
					<Separator />
					<Item
						onClick={() => {
							setShareDialogOpen(true);
						}}
					>
						Share
					</Item>
					<Item
						onClick={() => {
							setEditDialogOpen(true);
						}}
					>
						Edit
					</Item>
					<Item
						onClick={() => {
							calendarContext.deleteCalendar(calendar.id);
						}}
					>
						Delete calendar
					</Item>
				</Menu>
			</label>
		</>
	);
};
