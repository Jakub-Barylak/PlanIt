import { Dialog, Transition } from "@headlessui/react";
import type { Calendar } from "@/lib/types";
import { InputField } from "@/ui/InputField";
import { Fragment, useContext, useState } from "react";
import {
	CalendarViewContext,
	CalendarViewContextType,
} from "@/providers/CalendarProvider";

export const SidebarCalendarViewShareDialog = ({
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

	const share = (e: React.FormEvent) => {
		e.preventDefault();
		calendarContext.shareCalendar(calendar.id, email, coworked);
		setOpen(false);
	};

	const [email, setEmail] = useState<string>("");
	const [coworked, setCoworked] = useState<boolean>(false);

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
							<Dialog.Title>
								Share calendar{" "}
								<span className=" font-bold">{calendar.name}</span>
							</Dialog.Title>

							<form onSubmit={share} className="flex flex-col gap-4">
								{/* EMAIL FIELD */}
								<InputField
									value={email}
									setValue={setEmail}
									label={"E-mail"}
									elementName="email"
									inputType="email"
								/>
								{/* COWORKED CHECKBOX */}
								<label className="grid cursor-pointer grid-cols-[auto_1fr] items-center gap-2">
									<input
										type="checkbox"
										className="ml-2 h-4 w-4 bg-gray-200 text-gray-600 accent-slate-600"
										checked={coworked}
										onChange={(e) => setCoworked(e.target.checked)}
									/>
									<span>Coworked</span>
								</label>
								{/* SHARE BUTTON */}
								<input
									type="submit"
									value="SHARE"
									className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
									onClick={share}
								/>
							</form>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};
