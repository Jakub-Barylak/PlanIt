import { Dialog, Transition } from "@headlessui/react";
import type { Calendar } from "@/lib/types";
import { InputField } from "@/ui/InputField";
import { Fragment, useContext, useState } from "react";
import {
	CalendarViewContext,
	CalendarViewContextType,
} from "@/providers/CalendarProvider";
import Colorful from "@uiw/react-color-colorful";

export const SidebarCalendarViewEditCalendarDialog = ({
	isOpen,
	setOpen,
	calendar,
}: {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	calendar: Calendar;
}) => {
	const calendarContext = useContext(
		CalendarViewContext,
	) as CalendarViewContextType;

	const edit = (e: React.FormEvent) => {
		e.preventDefault();
		calendarContext.updateCalendar(calendar.id, name, color);
		setOpen(false);
	};

	const [name, setName] = useState(calendar.name);
	const [color, setColor] = useState(calendar.color);

	return (
		<Transition appear={true} show={isOpen} as={Fragment}>
			<Dialog
				open={isOpen}
				onClose={() => setOpen(false)}
				className="relative z-50"
			>
				{/* The backdrop, rendered as a fixed sibling to the panel container */}
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/25" />
				</Transition.Child>

				{/* Full-screen container to center the panel */}
				<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						{/* The actual dialog panel  */}
						<Dialog.Panel className="rounded bg-white p-4">
							<Dialog.Title
								className={"mb-2 w-full text-center text-lg font-semibold"}
							>
								Edit calendar
							</Dialog.Title>

							<form
								onSubmit={edit}
								className="grid grid-cols-1 items-center gap-2"
							>
								<InputField
									value={name}
									setValue={setName}
									label="Calendar name"
									elementName="calendarName"
								/>
								{/* COLOR FIELD */}
								<div className="flex flex-col">
									<span className="px-1 text-sm text-gray-600 dark:text-white/80">
										Calendar color
									</span>
									<Colorful
										color={color}
										onChange={(color) => setColor(color.hex)}
										disableAlpha={true}
										className=" self-center"
									/>
								</div>
								{/* SAVE BUTTON */}
								<input
									type="submit"
									value="SAVE"
									className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
									onClick={edit}
								/>
							</form>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};
