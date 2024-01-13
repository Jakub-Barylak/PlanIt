"use client";
import { FC, useState, useContext, Fragment } from "react";
import { Disclosure, Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import SidebarCalendarView from "./SidebarCalendarView";
import { Tooltip } from "@nextui-org/tooltip";
import type { Calendar } from "@/lib/types";
import { AuthContextType, AuthContext } from "@/providers/AuthProvider";
import { ThemeContextType, ThemeContext } from "@/providers/ThemeProvider";
import {
	CalendarViewContext,
	CalendarViewContextType,
} from "@/providers/CalendarProvider";

// ICONS
import { FiCalendar, FiFileText } from "react-icons/fi";
import { GrCircleQuestion } from "react-icons/gr";
import { GoGear } from "react-icons/go";
import { TbLogout } from "react-icons/tb";
import { IoMoonOutline } from "react-icons/io5";
import { SlArrowDown, SlArrowLeft } from "react-icons/sl";
import { setCookie } from "cookies-next";

interface Props {
	imageSrc?: string;
	// calendars: Calendar[];
}

export const SideNav: FC<Props> = ({
	imageSrc = "/userImg.jpeg",
	// calendars,
}): JSX.Element => {
	const [showSidebar, setShowSidebar] = useState<boolean>(true);
	const { user, resetTokens } = useContext(AuthContext) as AuthContextType;
	const { theme, setTheme } = useContext(ThemeContext) as ThemeContextType;
	const { calendars } = useContext(
		CalendarViewContext,
	) as CalendarViewContextType;

	const toggleTheme = () => {
		const isCurrentThemeDark = theme === "dark";
		setTheme(isCurrentThemeDark ? "light" : "dark");
		setCookie("theme", isCurrentThemeDark ? "light" : "dark");
	};

	return (
		<>
			{/* MAIN DIV */}
			<div
				className={`relative z-30 grid max-h-screen grid-cols-1 grid-rows-[min-content_min-content_min-content_min-content_1fr_min-content] rounded-r-lg border-r-2 bg-lightMode-background p-2 text-lightMode-secondary-text transition duration-200 ease-in-out dark:border-darkMode-border dark:bg-darkMode-background dark:text-darkMode-secondary-text
					${showSidebar ? "w-[15vw]" : "max-w-[calc(50px+1rem)]"}
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
						<p className="text-xs text-lightMode-secondary-text dark:text-darkMode-secondary-text">
							{user?.email}
						</p>
						<p className="text-sm font-semibold text-gray-800 dark:text-white ">
							{user?.name}
						</p>
					</div>
				</div>

				<hr className=" border-t-2 border-lightMode-hr dark:border-darkMode-hr" />
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
							className={`inline-flex items-center gap-2 rounded-lg p-2 hover:bg-lightMode-hover-bg dark:hover:bg-darkMode-hover-bg dark:hover:text-white ${
								showSidebar
									? "w-full justify-start"
									: "h-[50px] w-[50px] justify-center"
							}`}
							data-tip="Info"
						>
							{/* <Image alt="" src="/icons/help.svg" width={20} height={20} /> */}
							<GrCircleQuestion className="h-[20px] w-[20px]" />
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
													? "bg-lightMode-hover-bg dark:bg-darkMode-hover-bg dark:text-white"
													: "hover:bg-lightMode-hover-bg dark:hover:bg-darkMode-hover-bg dark:hover:text-white"
											} z-10 flex w-full rounded-lg p-2`}
										>
											<div className="inline-flex w-full items-center justify-between">
												<div className="inline-flex items-center">
													{/* <Image
														alt=""
														src="/icons/calendar-black.svg"
														width={20}
														height={20}
													/> */}
													<FiCalendar className="h-[20px] w-[20px]" />
													<span className="ml-2">Calendars</span>
												</div>
												{/* <Image
													alt=""
													src="/icons/arrow-left.svg"
													width={8}
													height={8}
													className={`${
														open ? "rotate-90" : "-rotate-90"
													} h-4 w-4 transform transition duration-100 ease-in-out`}
                                                /> */}
												<SlArrowDown
													className={`${
														open ? "rotate-180" : "rotate-0"
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
											<Disclosure.Panel className="ml-[calc(20px+0.5rem)] mt-1 flex w-auto flex-col">
												{/* CALENDARS HERE */}
												<SidebarCalendarView calendars={calendars} />
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
														? "bg-lightMode-hover-bg dark:bg-darkMode-hover-bg dark:text-white"
														: "hover:bg-lightMode-hover-bg dark:hover:bg-darkMode-hover-bg dark:hover:text-white"
												} z-10 flex h-[50px] w-[50px] items-center justify-center rounded-lg p-2`}
											>
												{/* <Image
													alt=""
													src="/icons/calendar-black.svg"
													width={20}
													height={20}
												/> */}
												<FiCalendar className="h-[20px] w-[20px]" />
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
											<Popover.Panel className="absolute -top-9 left-[calc(100%+0.25rem)] z-10 grid grid-cols-[max-content] rounded-lg border-2 bg-lightMode-background p-2 shadow-md dark:border-darkMode-light-border dark:bg-darkMode-background dark:text-white">
												<SidebarCalendarView calendars={calendars} />
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
							className={`inline-flex items-center gap-2 rounded-lg p-2 hover:bg-lightMode-hover-bg dark:hover:bg-darkMode-hover-bg dark:hover:text-white ${
								showSidebar
									? "w-full justify-start"
									: "h-[50px] w-[50px] justify-center"
							}`}
						>
							{/* <Image alt="" src="/icons/Page.svg" width={20} height={20} /> */}
							<FiFileText className="h-[20px] w-[20px]" />
							<span className={showSidebar ? "" : "hidden"}>About us</span>
						</div>
					</Tooltip>
				</div>

				<hr className="border-t-2 border-lightMode-hr dark:border-darkMode-hr" />

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
							className={`inline-flex items-center gap-2 rounded-lg p-2 hover:bg-lightMode-hover-bg dark:hover:bg-darkMode-hover-bg dark:hover:text-white ${
								showSidebar
									? "w-full justify-start"
									: "h-[50px] w-[50px] justify-center"
							}`}
						>
							{/* <Image alt="" src="/icons/settings.svg" width={20} height={20} /> */}
							<GoGear className="h-[20px] w-[20px]" />
							<span className={showSidebar ? "" : "hidden"}>Settings</span>
						</div>
					</Tooltip>
				</div>

				{/* DIV FOOTER -> DARK MODE, LOGOUT, LOGO */}
				<div className="grid grid-cols-1 gap-2 pt-2">
					<Tooltip
						content="Switch theme"
						showArrow={true}
						placement="right"
						isDisabled={showSidebar}
						classNames={{
							base: ["before:bg-black"],
							content: ["bg-black text-white"],
						}}
					>
						<div
							className={`inline-flex items-center gap-2 rounded-lg p-2 hover:bg-lightMode-hover-bg dark:hover:bg-darkMode-hover-bg dark:hover:text-white ${
								showSidebar
									? "w-full justify-start"
									: "h-[50px] w-[50px] justify-center"
							}`}
							onClick={toggleTheme}
						>
							{/* <Image alt="" src="/icons/moon.svg" width={20} height={20} /> */}
							<IoMoonOutline className="h-[20px] w-[20px]" />
							<span className={showSidebar ? "" : "hidden"}>Switch theme</span>
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
							className={`inline-flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-lightMode-hover-bg dark:hover:bg-darkMode-hover-bg dark:hover:text-white ${
								showSidebar
									? "w-full justify-start"
									: "h-[50px] w-[50px] justify-center"
							}`}
							onClick={() => {
								resetTokens();
							}}
						>
							{/* <Image alt="" src="/icons/Log-out.svg" width={20} height={20} /> */}
							<TbLogout className="h-[20px] w-[20px] text-logout" />
							<span className={`${showSidebar ? "" : "hidden"} text-logout`}>
								Logout
							</span>
						</div>
					</Tooltip>
					<div className="flex min-h-[5vh] items-center justify-center rounded-lg bg-lightMode-logo-bg dark:bg-darkMode-hr">
						<Image
							alt="PlanIt"
							src={
								showSidebar
									? theme == "light"
										? "/black-logo.svg"
										: "/white-logo.svg"
									: theme == "light"
										? "/dark-no-background.svg"
										: "/light-no-background.svg"
							}
							width={showSidebar ? 50 : 50}
							height={showSidebar ? 40 : 50}
							className={showSidebar ? "h-[60%] w-auto" : "h-auto w-auto p-0.5"}
						/>
					</div>
				</div>

				{/* ARROW */}
				<div
					className=" absolute -right-4 top-[calc(25px-0.5rem)] z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border-2 bg-gray-200 p-1 shadow-md dark:border-darkMode-secondary-text dark:bg-darkMode-background"
					onClick={() => setShowSidebar(!showSidebar)}
				>
					{/* <Image
						alt=""
						src="/icons/arrow-left.svg"
						width={10}
						height={10}
						className={`${
							showSidebar ? "" : "rotate-180"
						} transform cursor-pointer transition duration-200 ease-in-out dark:invert`}
                    /> */}
					<SlArrowLeft
						className={`${
							showSidebar ? "rotate-0" : "rotate-180"
						} transform cursor-pointer text-black transition duration-200 ease-in-out dark:text-white`}
					/>
				</div>
			</div>
		</>
	);
};
