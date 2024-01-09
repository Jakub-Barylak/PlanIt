"use client";


// components/DailyPlanner.tsx
import React, { useState } from 'react';
import Task from './Task';
import AddTask from './AddTask';
import RemoveTask from './RemoveTask';
import MoveTask from './MoveTask';
import Image from 'next/image';

interface TaskManagerProps {
  initialTasks: { text: string; completed: boolean }[];
}



const TaskManager: React.FC<TaskManagerProps> = ({ initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [showTaskManager, setShowTaskManager] = useState<boolean>(true);

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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '4px',
      padding: '4px',
      
    }}
    >
    
    
    
       <span
        onClick={toggleTaskManager}
        style={{
          cursor: 'pointer',
          display: 'inline-block',
          marginRight: '5px',
        }}
      >
       
       <Image
    src="/icons/arrow-right.svg"
    alt=">"
    width={10}
    height={10}
    style={{
      transform: showTaskManager ? 'rotate(0deg)' : 'rotate(180deg)',
      transition: 'transform 0.3s ease-in-out',
    }}
  />
      </span>
      {showTaskManager && (
      <>
    <ul style={{ display: 'block', marginTop: '8px' }}>
            {tasks.map((task, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <Task task={task} onToggle={() => handleToggle(index)} />
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto'  }}>
                  <RemoveTask onRemove={() => handleRemoveTask(index)} />
                  <MoveTask onMove={() => handleMoveTask(index)} />
                  </div>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex' }}>
            <AddTask onAdd={handleAddTask} />
          </div>
        </>
      )}
    </div>
  );
};


export default TaskManager;
