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

  return (
    <div>
      <button onClick={handleAddTask}>Add Task</button>
      <input
        type="text"
        placeholder="Enter task"
        value={newTask}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default AddTask;
