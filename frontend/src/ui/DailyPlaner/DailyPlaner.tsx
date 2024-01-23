// DailyPlanner.tsx
import React, { useState, useContext } from "react";
import TaskManager from "./TaskManager";
import { ThemeContext, ThemeContextType } from "@/providers/ThemeProvider";
import { toast } from "react-toastify";

const DailyPlaner: React.FC = () => {
	const initialTasks = [
		{ todo_element: "...", done: false },
		{ todo_element: "...", done: false },
	];

	const themeContext = useContext(ThemeContext);

	if (!themeContext) {
		return <div>Error: ThemeContext is null</div>;
	}

	const { theme }: ThemeContextType = themeContext;

	return (
		<div
		style={{
			width: '25vw', // Szerokość 100% ekranu
			maxWidth: '25vw', // Maksymalna szerokość
			margin: '0 auto', // Centruj diva
			padding: '20px', // Dodaj wewnętrzny odstęp
			textAlign: 'center', // Wyśrodkuj zawartość
			color: theme === 'dark' ? 'white' : 'black',
			background: theme === 'dark' ? '#161920' : '#FFFFFF',
		  }}
			>
			<TaskManager initialTasks={initialTasks} />
		</div>
	);
};

export default DailyPlaner;
