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
    
    <div
      /*style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '4px',
        padding: '4px',
        background: theme === 'dark' ? '#161920' : '#FFFFFF',//'#333' : 'white',
        color: theme === 'dark' ? 'white' : 'black',
      }}*/
      className={`h-auto lg:h-4/5 flex flex-col items-start gap-4 p-4 bg-${theme === 'dark' ? 'dark' : 'white'}`}
    
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
        //className="cursor-pointer inline-block mr-5 mt-40 ml-15 z-10"
      >
        <div
    /*style={{
      width: '30px', // Ustaw szerokość równą wysokości dla uzyskania kwadratu
      height: '30px', // Ustaw wysokość równą szerokości dla uzyskania kwadratu
      padding: '5px',
      background: theme === 'dark' ? '#161920' : '#FFFFFF',//'#333' : '#ddd', // kolor tła dla kwadratu
      borderRadius: '4px', // zaokrąglone rogi
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid #ddd',
    }}*/
    className={`w-30 h-30 p-5 bg-myCustomBackground rounded-4 flex items-center justify-center border-2 border-myCustomColor`}

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
      <div
      style={{
        overflowY: 'auto', // Dodaj obszar przewijania tylko dla listy zadań
        maxHeight: 'calc(100vh - 40px)', // Ustaw maksymalną wysokość, aby zmieścić się na stronie
      }}
    >
        <ul 
          /*style={{ 
            display: 'block',
            marginTop: '8px',
            background: theme === 'dark' ? '#161920' : '#FFFFFF',//'#333' : 'white',
            color: theme === 'dark' ? 'white' : 'black',
            maxWidth: showTaskManager ? 'max-content' : '100px', // Dostosuj szerokość zwiniętego paska
            overflow: 'hidden', // Ukryj treść, która nie mieści się w określonej szerokości
            transition: 'width 0.3s ease-in-out', 
          }}*/
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
