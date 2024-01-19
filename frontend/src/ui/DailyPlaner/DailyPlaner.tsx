// DailyPlanner.tsx
import React, { useState, useContext } from "react";
import TaskManager from "./TaskManager";
import { ThemeContext, ThemeContextType } from "@/providers/ThemeProvider";
import { toast } from "react-toastify";

const DailyPlaner: React.FC = () => {
	const initialTasks = [
		{ text: "...", completed: false },
		{ text: "...", completed: false },
	];

	const themeContext = useContext(ThemeContext);

	if (!themeContext) {
		return <div>Error: ThemeContext is null</div>;
	}

	const { theme }: ThemeContextType = themeContext;

	return (
		<div
			style={{
				textAlign: "center",
				paddingTop: "20px",
				color: theme === "dark" ? "white" : "black",
				background: theme === "dark" ? '#161920' : '#FFFFFF',//"#333" : "white",
			}}
		>
			<h2
				style={{ fontSize: "24px" }}
				onClick={() => {
					toast("Hello, World!");
				}}
			>
			</h2>
			<TaskManager initialTasks={initialTasks} />
		</div>
	);
};

export default DailyPlaner;
