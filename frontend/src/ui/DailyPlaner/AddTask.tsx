// components/AddTask.tsx
import React, { useState } from 'react';
import Image from 'next/image';

interface AddTaskProps {
  onAdd: (newTask: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAdd }) => {
  const [newTask, setNewTask] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      onAdd(newTask);
      setNewTask('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    //<div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img
          src= "/icons/plus-todo.svg"
          alt= "Add Task"
          onClick= {handleAddTask}
          style={{cursor: 'pointer', width: '20px', height: '20px'}}
      />
      <input
        type="text"
        placeholder="Enter task"
        value={newTask}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      
    </div>
  );
};

export default AddTask;
