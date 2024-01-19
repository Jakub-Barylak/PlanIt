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

  const arrowStyle = {
    marginTop: showTaskManager ? '-8%' : '-15px',
  };
  
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
    //event.currentTarget.classList.add('dragging');
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

    <div className={`h-auto flex flex-col items-start gap-4 p-4 bg-${theme === 'dark' ? 'dark' : 'white'}`} >
    <div className={`h-full w-0.5 bg-${theme === 'dark' ? 'gray-600' : 'gray-200'} absolute left-[${showTaskManager ? '79.5%' : '100%'}]  top-0 bottom-4 transition-all duration-300`}></div>  
    <div className={`h-1 bg-${theme === 'dark' ? 'gray-600' : 'gray-200'} w-full mb-[-10%] h-0.5`}></div>

    <span
    onClick={toggleTaskManager}
    className={`cursor-pointer inline-block mr-5 ${showTaskManager ? 'ml-[-13%] mt-[-8%]' : 'ml-[-65%] mt-[-65%]'}  z-10`} >

        <div
    //className={`w-30 h-30 p-5 bg-myCustomBackground rounded-4 flex items-center justify-center border-2 border-myCustomColor`}
    className={`w-8 h-8 p-2 bg-myCustomBackground rounded flex items-center justify-center border-2 border-myCustomColor`}
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
<h2 className={`text-xl mb-2 mt-[-50px] mx-auto ${showTaskManager ? '' : 'mb-8'}`} style={{ color: theme === 'dark' ? 'text-gray' : '' }}>  To Do</h2>

      {showTaskManager && (
      <div
      style={{
        overflowY: 'auto',
        maxHeight: 'auto',//'calc(100vh - 60px)', 
      }}
    >
        <ul 
          
          className={`block mt-[-5%] bg-myCustomBackground text-myCustomColor max-w-content overflow-hidden transition-width duration-300 ease-in-out`}
        >
          {tasks.map((task, index) => (
            <li 
            key={index}
            draggable 
            onDragStart={(event) => handleDragStart(index, event)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(index, event)}
            className={`flex items-center justify-between bg-myCustomBackground text-${theme === 'dark' ? 'white' : 'black'} p-1 rounded-2 w-full box-border mb-0`}
            >

<Task task={task} onToggle={() => handleToggle(index)} darkMode={theme === 'dark'} />
      <div className="flex items-center" >
      <div className="mr-2">
      <RemoveTask onRemove={() => handleRemoveTask(index)} />
     
      </div>
      <div style={{ marginTop: '10px' }}>
      <MoveTask onMove={(dragIndex, hoverIndex) => handleMoveTask(dragIndex, hoverIndex)} index={index} />
        
      </div>
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
          </div>
      )}
    </div>
   );
};


export default TaskManager;
