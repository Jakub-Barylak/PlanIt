"use client";


// components/DailyPlanner.tsx
import React, { useState } from 'react';
import Task from './Task';
import AddTask from './AddTask';
import RemoveTask from './RemoveTask';
import MoveTask from './MoveTask';

interface TaskManagerProps {
  initialTasks: { text: string; completed: boolean }[];
}

const TaskManager: React.FC<TaskManagerProps> = ({ initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);

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

  return (
    <div>
    <ul>
      {tasks.map((task, index) => (
        <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
          <Task task={task} onToggle={() => handleToggle(index)} />
          <div style={{ marginLeft: 'auto', marginRight: '10px'  }}>
            <RemoveTask onRemove={() => handleRemoveTask(index)} />
            <MoveTask onMove={() => handleMoveTask(index)} />
          </div>
        </li>
      ))}
    </ul>
    <div style={{ display: 'flex' }}>
      <AddTask onAdd={handleAddTask} />
    </div>
  </div>
  );
};

export default TaskManager;
