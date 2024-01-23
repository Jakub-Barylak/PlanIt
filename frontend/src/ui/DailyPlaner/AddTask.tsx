// components/AddTask.tsx
import React, { useState, useContext } from 'react';
import Image from 'next/image';
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import {toast} from "react-toastify"


interface AddTaskProps {
  onAdd: (newTask: string) => void;
  flag: Boolean;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTask: React.FC<AddTaskProps> = ({ onAdd, flag, setFlag }) => {
  const [newTask, setNewTask] = useState<string>('');

  const { axios } = useContext(AuthContext) as AuthContextType;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      onAdd(newTask);
      setNewTask('');

      setFlag(!flag);

      axios.post("/todo_lists/", {"todo_element": newTask, "done": false})
      .then((res)=>{
        toast.success("Added to-do task")
      })
      .catch((error)=>{
        toast.error("Error to-do list")
      })
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
