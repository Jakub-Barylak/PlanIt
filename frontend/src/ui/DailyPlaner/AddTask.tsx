// components/AddTask.tsx
import React, { useState } from 'react';

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
    <div style={{ display: 'flex', gap: '8px' }}>
      <button onClick={handleAddTask}>Add Task</button>
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
