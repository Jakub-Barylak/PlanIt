"use client";
import { FC, useState, Fragment } from "react";
import { Disclosure, Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import SidebarCalendarView from "./SidebarCalendarView";
import { Tooltip } from "@nextui-org/tooltip";

interface Props {
	imageSrc?: string;
}

export const SideNav: FC<Props> = ({
	imageSrc = "/userImg.jpeg",
}): JSX.Element => {
	const [showSidebar, setShowSidebar] = useState<boolean>(true);

	//r40 g42 b50 change to rgb #282c34
	// r20 g22 b30 change to rgb #282c34

	return (
		<>
			{/* MAIN DIV */}
			<div
				className={`relative z-30 grid max-h-screen grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content_1fr_max-content] rounded-r-lg border-r-2 bg-inherit p-2 dark:border-[#14161D] dark:bg-[#161920] dark:text-[#6A6A6A]
					${showSidebar ? "min-w-[15vw]" : "max-w-[calc(50px+1rem)]"}
                    `}
			>
				{/* DIV HEADER -> IMAGE, EMAIL, NAME */}
				<div
					className={` pb-4 ${
						showSidebar
							? "grid grid-cols-[max-content_max-content]"
							: "items-center"
					}`}
				>
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
					<div
						className={`ml-3 mr-4 grid grid-rows-[2fr_3fr] items-center ${
							showSidebar ? "" : "hidden"
						}`}
					>
						{/* DATA FROM AUTH PROVIDER */}
						<p className="text-xs text-gray-400 dark:text-[#6A6A6A]">
							email@email.com
						</p>
						<p className="text-sm font-semibold text-gray-800 dark:text-white ">
							User Name
						</p>
					</div>
				</div>

				<hr className=" border-t-2 dark:border-[#282A3B]" />
				{/* DIV BODY -> INFO, CALENDARS, ABOUT US */}
				<div className="grid max-w-full grid-cols-1 gap-3 py-4">
					{/* INFO */}
					<Tooltip
						content="Info"
						showArrow={true}
						placement="right"
						isDisabled={showSidebar}
						classNames={{
							base: ["before:bg-black"],
							content: ["bg-black text-white"],
						}}
					>
						<div
							className={`inline-flex gap-2 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-[#282c34] dark:hover:text-white ${
								showSidebar
									? "w-full justify-start"
									: "h-[50px] w-[50px] justify-center"
							}`}
							data-tip="Info"
						>
							<Image alt="" src="/icons/help.svg" width={20} height={20} />
							<span className={showSidebar ? "" : "hidden"}>Info</span>
						</div>
					</Tooltip>

					{/* CALENDARS */}
					<div>
						{showSidebar ? ( // SHOW AS DROPDOWN WHEN SIDEBAR IS SHOWN
							<Disclosure>
								{({ open }) => (
									<>
										<Disclosure.Button
											className={`${
												open
													? "bg-gray-100 dark:bg-[#282c34] dark:text-white"
													: "hover:bg-gray-100 dark:hover:bg-[#282c34] dark:hover:text-white"
											} z-10 flex w-full rounded-lg p-2`}
										>
											<div className="inline-flex w-full items-center justify-between">
												<div className="inline-flex">
													<Image
														alt=""
														src="/icons/calendar-black.svg"
														width={20}
														height={20}
													/>
													<span className="ml-2">Calendars</span>
												</div>
												<Image
													alt=""
													src="/icons/arrow-left.svg"
													width={8}
													height={8}
													className={`${
														open ? "rotate-90" : "-rotate-90"
													} h-4 w-4 transform transition duration-100 ease-in-out`}
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
											<Disclosure.Panel className="ml-[calc(20px+0.5rem)] mt-1 grid grid-cols-1 gap-1">
												{/* CALENDARS HERE */}
												<SidebarCalendarView />
											</Disclosure.Panel>
										</Transition>
									</>
								)}
							</Disclosure>
						) : (
							// SHOW AS POPOVER WHEN SIDEBAR IS HIDDEN
							<Popover className="relative">
								{({ open }) => (
									<>
										<Tooltip
											content="Calendars"
											showArrow={true}
											placement="right"
											classNames={{
												base: ["before:bg-black"],
												content: ["bg-black text-white"],
											}}
										>
											<Popover.Button
												className={`${
													open
														? "bg-gray-100 dark:bg-[#282c34] dark:text-white"
														: "hover:bg-gray-100 dark:hover:bg-[#282c34] dark:hover:text-white"
												} z-10 flex h-[50px] w-[50px] items-center justify-center rounded-lg p-2`}
											>
												<Image
													alt=""
													src="/icons/calendar-black.svg"
													width={20}
													height={20}
												/>
											</Popover.Button>
										</Tooltip>
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
											<Popover.Panel className="absolute -top-9 left-[calc(100%+0.25rem)] z-10 grid grid-cols-[max-content] rounded-lg border-2 bg-white p-2 shadow-md dark:border-[#535353] dark:bg-[#161920] dark:text-white">
												<SidebarCalendarView />
											</Popover.Panel>
										</Transition>
									</>
								)}
							</Popover>
						)}
					</div>
					{/* ABOUT US */}
					<Tooltip
						content="About us"
						showArrow={true}
						placement="right"
						isDisabled={showSidebar}
						classNames={{
							base: ["before:bg-black"],
							content: ["bg-black text-white"],
						}}
					>
						<div
							className={`inline-flex gap-2 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-[#282c34] dark:hover:text-white ${
								showSidebar
									? "w-full justify-start"
									: "h-[50px] w-[50px] justify-center"
							}`}
						>
							<Image alt="" src="/icons/Page.svg" width={20} height={20} />
							<span className={showSidebar ? "" : "hidden"}>About us</span>
						</div>
					</Tooltip>
				</div>

				<hr className="border-t-2 dark:border-[#282A3B]" />

				<div className="pt-4">
					{/* SETTINGS */}
					<Tooltip
						content="Settings"
						showArrow={true}
						placement="right"
						isDisabled={showSidebar}
						classNames={{
							base: ["before:bg-black"],
							content: ["bg-black text-white"],
						}}
					>
						<div
							className={`inline-flex gap-2 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-[#282c34] dark:hover:text-white ${
								showSidebar
									? "w-full justify-start"
									: "h-[50px] w-[50px] justify-center"
							}`}
						>
							<Image alt="" src="/icons/settings.svg" width={20} height={20} />
							<span className={showSidebar ? "" : "hidden"}>Settings</span>
						</div>
					</Tooltip>
				</div>

				{/* DIV FOOTER -> DARK MODE, LOGOUT, LOGO */}
				<div className="grid grid-cols-1 gap-2 pt-2">
					<Tooltip
						content="Dark Mode"
						showArrow={true}
						placement="right"
						isDisabled={showSidebar}
						classNames={{
							base: ["before:bg-black"],
							content: ["bg-black text-white"],
						}}
					>
						<div
							className={`inline-flex gap-2 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-[#282c34] dark:hover:text-white ${
								showSidebar
									? "w-full justify-start"
									: "h-[50px] w-[50px] justify-center"
							}`}
						>
							<Image alt="" src="/icons/moon.svg" width={20} height={20} />
							<span className={showSidebar ? "" : "hidden"}>Dark Mode</span>
						</div>
					</Tooltip>
					<Tooltip
						content="Logout"
						showArrow={true}
						placement="right"
						isDisabled={showSidebar}
						classNames={{
							base: ["before:bg-black"],
							content: ["bg-black text-white"],
						}}
					>
						<div
							className={`inline-flex gap-2 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-[#282c34] dark:hover:text-white ${
								showSidebar
									? "w-full justify-start"
									: "h-[50px] w-[50px] justify-center"
							}`}
						>
							<Image alt="" src="/icons/Log-out.svg" width={20} height={20} />
							<span className={showSidebar ? "" : "hidden"}>Logout</span>
						</div>
					</Tooltip>
					<div className="flex min-h-[5vh] justify-center rounded-lg bg-gray-400 align-middle dark:bg-[#282A32]">
						<Image
							alt="PlanIt"
							src={"/black-logo.svg"}
							width={100}
							height={90}
							className="dark:invert"
						/>
					</div>
				</div>

				{/* ARROW */}
				<div className=" absolute -right-4 top-[calc(25px-0.5rem)] z-10 flex h-8 w-8 justify-center rounded-lg border-2 bg-gray-200 p-1 shadow-md dark:border-[#6A6A6A] dark:bg-[#161920]">
					<Image
						alt=""
						src="/icons/arrow-left.svg"
						width={10}
						height={10}
						onClick={() => setShowSidebar(!showSidebar)}
						className={`${
							showSidebar ? "" : "rotate-180"
						} transform cursor-pointer transition duration-200 ease-in-out dark:invert`}
					/>
				</div>
			</div>
		</>
	);
};
