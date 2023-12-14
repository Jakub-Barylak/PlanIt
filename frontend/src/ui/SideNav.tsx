"use client";
import { FC, useState, Fragment } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import Image from "next/image";

interface Props {
	imageSrc?: string;
}

export const SideNav: FC<Props> = ({
	imageSrc = "/userImg.jpeg",
}): JSX.Element => {
	const [showSidebar, setShowSidebar] = useState<boolean>(true);
	const [showCalendars, setShowCalendars] = useState<boolean>(false);

	const calendars = ["Calendar 1", "Calendar 2"];

	return (
		<>
			{/* MAIN DIV */}
			<div className="grid grid-cols-1 bg-inherit p-6 h-screen grid-rows-[max-content_max-content_max-content_max-content_1fr_max-content] relative min-w-[15vw]">
				{/* DIV HEADER -> IMAGE, EMAIL, NAME */}
				<div className="grid grid-cols-[max-content_max-content] pb-4">
					{/* USER IMAGE */}
					<div className="rounded-lg">
						<Image
							alt=""
							src={imageSrc}
							width={50}
							height={50}
							className="rounded-lg"
						/>
					</div>
					<div className="grid grid-rows-[2fr_3fr] ml-3 items-center">
						{/* DATA FROM AUTH PROVIDER */}
						<p className="text-xs text-gray-400">email@email.com</p>
						<p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
							User Name
						</p>
					</div>
				</div>

				<hr className=" border-t-2" />
				{/* DIV BODY -> INFO, CALENDARS, ABOUT US */}
				<div className="py-4 grid grid-cols-1 gap-3">
					{/* INFO */}
					<div className="hover:bg-gray-100 p-2 rounded-lg inline-flex gap-2">
						<Image
							alt=""
							src="/icons/help.svg"
							width={20}
							height={20}
						/>
						<span>Info</span>
					</div>

					{/* CALENDARS */}
					<div>
						<Disclosure>
							{({ open }) => (
								<>
									<Disclosure.Button className="flex w-full p-2 z-10 hover:bg-gray-100 rounded-lg">
										<div className="inline-flex justify-between w-full items-center">
											<div className="inline-flex">
												<Image
													alt=""
													src="/icons/calendar-black.svg"
													width={20}
													height={20}
												/>
												<span className="ml-2">
													Calendars
												</span>
											</div>
											<Image
												alt=""
												src="/icons/arrow-left.svg"
												width={8}
												height={8}
												className={`${
													open
														? "rotate-90"
														: "-rotate-90"
												} w-4 h-4 transform transition duration-100 ease-in-out`}
											/>
										</div>
									</Disclosure.Button>
									<Transition
										show={open}
										unmount={false}
										enter="transition duration-200 ease-out"
										enterFrom="transform scale-95 opacity-0"
										enterTo="transform scale-100 opacity-100"
										leave="transition duration-100 ease-out"
										leaveFrom="transform scale-100 opacity-100"
										leaveTo="transform scale-95 opacity-0"
									>
										<Disclosure.Panel className="ml-[calc(20px+0.5rem)] grid grid-cols-1 gap-1 mt-1">
											{/* CALENDARS HERE */}
											{calendars.map(
												(calendar, index) => (
													<label
														key={index}
														className="hover:bg-gray-100 p-2 rounded-lg grid grid-cols-[max-content_auto] justify-between items-center"
													>
														<span>{calendar}</span>
														<input
															type="checkbox"
															className="ml-2 w-4 h-4 text-gray-600 bg-gray-200"
														/>
													</label>
												)
											)}
										</Disclosure.Panel>
									</Transition>
								</>
							)}
						</Disclosure>
					</div>
					{/* ABOUT US */}
					<div className="hover:bg-gray-100 p-2 rounded-lg inline-flex gap-2">
						<Image
							alt=""
							src="/icons/Page.svg"
							width={20}
							height={20}
						/>
						<span>About us</span>
					</div>
				</div>

				<hr className="border-t-2" />

				<div className="pt-4">
					{/* SETTINGS */}
					<div className="hover:bg-gray-100 p-2 w-full rounded-lg inline-flex gap-2">
						<Image
							alt=""
							src="/icons/settings.svg"
							width={20}
							height={20}
						/>
						<span>Settings</span>
					</div>
				</div>

				{/* DIV FOOTER -> DARK MODE, LOGOUT, LOGO */}
				<div className="pt-2 grid grid-cols-1 gap-2">
					<div className="hover:bg-gray-100 p-2 rounded-lg inline-flex gap-2">
						<Image
							alt=""
							src="/icons/moon.svg"
							width={20}
							height={20}
						/>
						<span>Dark Mode</span>
					</div>
					<div className="hover:bg-gray-100 p-2 rounded-lg inline-flex gap-2">
						<Image
							alt=""
							src="/icons/Log-out.svg"
							width={20}
							height={20}
						/>
						<span>Logout</span>
					</div>
					<div className="flex justify-center align-middle bg-gray-400 min-h-[5vh] rounded-lg">
						<Image
							alt="PlanIt"
							src={"/black-logo.svg"}
							width={100}
							height={90}
						/>
					</div>
				</div>

				{/* ARROW */}
				<div className="flex justify-center h-8 w-8 absolute -right-4 top-6 z-10 p-1 bg-gray-200 shadow-md rounded-lg">
					<Image
						alt=""
						src="/icons/arrow-left.svg"
						width={10}
						height={10}
						onClick={() => setShowSidebar(!showSidebar)}
					/>
				</div>
			</div>
		</>
	);
};
