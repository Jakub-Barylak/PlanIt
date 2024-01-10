"use client";


// components/TaskManager.tsx
import React, { useState, useContext } from 'react';
import Task from './Task';
import AddTask from './AddTask';
import RemoveTask from './RemoveTask';
import MoveTask from './MoveTask';
import Image from 'next/image';
import { ThemeContext, ThemeContextType } from "@/providers/ThemeProvider";

interface TaskManagerProps {
  initialTasks: { text: string; completed: boolean }[];
}



const TaskManager: React.FC<TaskManagerProps> = ({ initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [showTaskManager, setShowTaskManager] = useState<boolean>(true);
  
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return <div>Error: ThemeContext is null</div>;
  }
  const { theme, setTheme}: ThemeContextType = themeContext;
  
  const handleToggle = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index] = {
      ...newTasks[index],
      completed: !newTasks[index].completed,
    };
    setTasks(newTasks);
  };

  const handleAddTask = (text: string) => {
    const newTask = { text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const handleRemoveTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleMoveTask = (index: number) => {
    // Implementuj logikę przemieszczania zadania
    console.log(`Move task at index ${index}`);
  };

  const toggleTaskManager = () => {
    setShowTaskManager(!showTaskManager);
  };

  return (
    <div 
    style={{
      minHeight: '100vh',  // Ustaw wysokość na co najmniej 100% widoku
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '4px',
      padding: '4px',
      background: theme === 'dark' ? '#333' : 'white',
      color: theme === 'dark' ? 'white' : 'black',
    }}
    >
       <span
        onClick={toggleTaskManager}
        style={{
          cursor: 'pointer',
          display: 'inline-block',
          marginRight: '5px',
          marginTop: '-40px',
          marginLeft: '-15px',
          zIndex: 1, 
        }}
      >
        <div
    style={{
      width: '30px', // Ustaw szerokość równą wysokości dla uzyskania kwadratu
      height: '30px', // Ustaw wysokość równą szerokości dla uzyskania kwadratu
      padding: '5px',
      background: theme === 'dark' ? '#333' : '#ddd', // kolor tła dla kwadratu
      borderRadius: '4px', // zaokrąglone rogi
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid #ddd',
    }}
  >
       
       <Image
        src="/icons/arrow-right.svg"
        alt=""
        width={10}
        height={10}
        style={{
          transform: showTaskManager ? 'rotate(0deg)' : 'rotate(180deg)',
          transition: 'transform 0.3s ease-in-out',
          borderRadius: '4px',
        }}
  />
  </div>
</span>
      {showTaskManager && (
      <>
        <ul 
          style={{ 
            display: 'block',
            marginTop: '8px',
            background: theme === 'dark' ? '#444' : 'white',
            color: theme === 'dark' ? 'white' : 'black',
            maxWidth: showTaskManager ? 'max-content' : '100px', // Dostosuj szerokość zwiniętego paska
            overflow: 'hidden', // Ukryj treść, która nie mieści się w określonej szerokości
            transition: 'width 0.3s ease-in-out', 
          }}
        >
          {tasks.map((task, index) => (
            <li 
              key={index} 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                background: theme === 'dark' ? '#333' : 'white',
                color: theme === 'dark' ? 'white' : 'black',
                padding: '8px',
                borderRadius: '4px',
                marginBottom: '4px',
                width: '100%', 
                boxSizing: 'border-box',
              }}
            >
          
     
    <Task task={task} onToggle={() => handleToggle(index)} darkMode={theme === 'dark'}/>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
      }}
    >
            
                  <RemoveTask onRemove={() => handleRemoveTask(index)} />
                  <MoveTask onMove={() => handleMoveTask(index)} />
                </div>
              </li>
            ))}
          </ul>
          <div style=
                {{ 
                  display: 'flex' 
                }}
            >
            <AddTask onAdd={handleAddTask} />
          </div>
        </>
      )}
    </div>

   );
};


export default TaskManager;
