"use client";


// components/TaskManager.tsx
import React, { useState, useContext } from 'react';
import { useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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

  const handleMoveTask = (dragIndex: number, hoverIndex: number) => {
    const draggedTask = tasks[dragIndex];
    const newTasks = [...tasks];
    newTasks.splice(dragIndex, 1);
    newTasks.splice(hoverIndex, 0, draggedTask);
    setTasks(newTasks);
  };

  const handleDragStart = (index: number, event: React.DragEvent<HTMLLIElement>) => {
    event.dataTransfer.setData('text/plain', String(index));
  };

  const handleDrop = (index: number, event: React.DragEvent<HTMLLIElement>) => {
    const draggedIndex = Number(event.dataTransfer.getData('text/plain'));
    const newTasks = [...tasks];
    const [removedTask] = newTasks.splice(draggedIndex, 1);
    newTasks.splice(index, 0, removedTask);
    setTasks(newTasks);
  };

  const toggleTaskManager = () => {
    setShowTaskManager(!showTaskManager);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
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
              onDragStart={(event) => handleDragStart(index, event)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => handleDrop(index, event)}
              draggable 
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
          
          <MoveTask onMove={(dragIndex, hoverIndex) => handleMoveTask(dragIndex, hoverIndex)} index={index} />
    <Task task={task} onToggle={() => handleToggle(index)} darkMode={theme === 'dark'}/>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
      }}
    >
            
                  <RemoveTask onRemove={() => handleRemoveTask(index)} />
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
