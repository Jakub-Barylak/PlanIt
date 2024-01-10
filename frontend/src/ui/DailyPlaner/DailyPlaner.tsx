// DailyPlanner.tsx
import React, { useState, useContext } from 'react';
import TaskManager from './TaskManager';
import { ThemeContext, ThemeContextType } from "@/providers/ThemeProvider";

const DailyPlaner: React.FC = () => {
  const initialTasks = [
    { text: 'Task 1', completed: false },
    { text: 'Task 2', completed: true },
  ];


  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return <div>Error: ThemeContext is null</div>;
  }

  const { theme }: ThemeContextType = themeContext;


  return (
    <div 
      style={{ 
        textAlign: 'center', 
        paddingTop: '20px', 
        color: theme === 'dark' ? 'white' : 'black', 
        background: theme === 'dark' ? '#333' : 'white' 
      }}
    >      
      <h2 style={{ fontSize: '24px' }}>  To Do  </h2>
      <TaskManager initialTasks={initialTasks} />
    </div>
  );
};

export default DailyPlaner;
