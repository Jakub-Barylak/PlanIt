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

	const { isDark  }: ThemeContextType = themeContext;
	const [showTaskManager, setShowTaskManager] = useState<boolean>(true);


	const handleShowTaskManagerChange = (newShowTaskManager: boolean) => {
		setShowTaskManager(newShowTaskManager);
	  };

	return (
		<div
		//className={`relative z-30 grid max-h-screen grid-cols-1 grid-rows-[min-content_min-content_min-content_min-content_1fr_min-content] rounded-r-lg border-r-2 bg-lightMode-background p-2 text-lightMode-secondary-text transition duration-200 ease-in-out dark:border-darkMode-border dark:bg-darkMode-background dark:text-darkMode-secondary-text
  		//${showTaskManager ? "w-[15vw]" : "max-w-[calc(50px+1rem)]"}}

		style={{
			width: showTaskManager ? '18vw' : 'auto', // Szerokość 100% ekranu
			maxWidth: '20vw',
			color: isDark  ? 'white' : 'black',
			background: isDark  ? '#161920' : '#FFFFFF',
			transition: 'height 0.3s ease', // dodaj płynne przejści
		  }}
			>
			<TaskManager
        	initialTasks={initialTasks}
			onShowTaskManagerChange={handleShowTaskManagerChange}
        	//showTaskManager={showTaskManager}
        	//setShowTaskManager={setShowTaskManager}
      />
		</div>
	);
};

export default DailyPlaner;
