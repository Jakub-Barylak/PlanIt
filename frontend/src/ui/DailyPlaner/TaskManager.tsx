"use client";


// components/TaskManager.tsx
import React, { useState, useContext, useEffect } from 'react';
import Task from './Task';
import AddTask from './AddTask';
import RemoveTask from './RemoveTask';
import MoveTask from './MoveTask';
import Image from 'next/image';
import { ThemeContext, ThemeContextType } from "@/providers/ThemeProvider";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import {  AxiosResponse } from 'axios';
import {toast} from "react-toastify"



interface TaskManagerProps {
  initialTasks: { todo_element: string; done: boolean, id?: number}[];
  onShowTaskManagerChange: (value: boolean) => void;
  //showTaskManager: boolean;
  //setShowTaskManager: React.Dispatch<React.SetStateAction<boolean>>;
}



const TaskManager: React.FC<TaskManagerProps> = ({ 
  initialTasks,
onShowTaskManagerChange}) => {
  const { axios } = useContext(AuthContext) as AuthContextType;

  const [tasks, setTasks] = useState(initialTasks);

  const [flag, setFlag] = useState(false);

  

  useEffect(()=>{
    axios.get("/todo_lists/")
    .then((res: AxiosResponse)=>{
      setTasks(res.data)
    })
  },[])

  useEffect(()=>{
  axios.get("/todo_lists/")
  .then((res: AxiosResponse)=>{
    setTasks(res.data)
  })
  },[flag])

  

  const [showTaskManager, setShowTaskManager] = useState<boolean>(true);
  
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return <div>Error: ThemeContext is null</div>;
  }
  const { isDark, toggleThemeHandler } = useContext(
    ThemeContext
  ) as ThemeContextType;

  const arrowStyle = {
    marginTop: showTaskManager ? '-8%' : '-15px',
  };
  
  const handleToggle = (index: number) => {
    const newTasks = [...tasks];
    
    axios.patch(`/todo_lists/${tasks[index].id}/`, {"done": !newTasks[index].done})
    .then(()=>{
      toast.success("Task done")
      newTasks[index] = {
        ...newTasks[index],
        done: !newTasks[index].done,
      };
      setTasks(newTasks);
      setFlag(!flag);
    })
    .catch((error)=>{
      toast.error("ups")
      console.log(error)
    })
  };

  console.log(tasks)
  const handleAddTask = (todo_element: string) => {
    const newTask = { todo_element, done: false };
    setTasks([...tasks, newTask]);
  };

  const handleRemoveTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    
    axios.delete(`/todo_lists/${tasks[index].id}/`)
    .then(()=>{
      toast.success("Task removed successfully")
      setFlag(!flag);
    })
    .catch((error)=>{
      toast.error("Task didn't remove")
      console.log(error)
    })

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

  // const toggleTaskManager = () => {
  //   setShowTaskManager(!showTaskManager);
  // };

  const toggleTaskManager = () => {
    const newShowTaskManager = !showTaskManager;
    setShowTaskManager(newShowTaskManager);
    onShowTaskManagerChange(newShowTaskManager); // Wywołanie callbacka
  };
  return (

    
    <div className={`h-100vh  flex flex-col items-start gap-4 p-4 bg-${isDark  ? 'bg-dark' : 'bg-white'} `} > 
    <div className={`h-full  w-0.5 bg-${isDark  ? 'gray-500' : 'gray-200'} absolute ${showTaskManager ? 'left-[82vw]' : 'opacity-0 invisible'}  top-0 bottom-4 transition-all duration-300 z-2'}`}></div>  
  

    <span
    onClick={toggleTaskManager}
    //</div>className={`cursor-pointer inline-block mr-5 ${showTaskManager ? 'ml-[-3vw] mt-[1vh]' : 'ml-[-5vw] mt-[0vh] z-10'}`} >
    className={`cursor-pointer inline-block mr-5 ${showTaskManager ? 'ml-[-3vw] mt-[1vh]' : 'ml-[-5vw] mt-[1vh]'}  z-10`} >
      <div
    className={`w-8 h-8 p-1
    ${isDark ? 'bg-gray-900 border-darkMode-secondary-text' : 'bg-gray-200 border-gray-200'}
    rounded flex items-center justify-center border-2 `}

  >
    <SlArrowLeft
     className={`${
      showTaskManager ? 'rotate-180' : 'rotate-0'
    } transform cursor-pointer transition duration-200 ease-in-out ${
      isDark  ? 'text-white' : 'text-black'
    }`}  />
    
  </div>
</span>
<h2 className={`text-xl mt-[-5vh] mx-auto ${isDark  ? 'text-gray-400' : 'text-gray-700'}  ${showTaskManager ? 'text-center' : 'text-center text-ml-[3vw] '} `} style={{ width: showTaskManager ? '16vw' : '5vw' }}>  To Do</h2>

<div className={`h-0.5 bg-${isDark  ? 'gray-500' : 'gray-200'} w-full mt-[0vh] ${showTaskManager ? '' : 'opacity-0 invisible'}`}></div>


      {showTaskManager && (
      <div
      
      style={{
        overflowY: 'auto',
        maxHeight: '85vh',//'calc(100vh - 15vh)', //'auto',
      }}
    >
        <ul 
          
          //className={`block mt-[-5%] bg-myCustomBackground text-myCustomColor max-w-content overflow-hidden transition-width duration-300 ease-in-out`}
        >
          {tasks.map((task, index) => (
            <li 
            key={index}
            draggable 
            onDragStart={(event) => handleDragStart(index, event)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(index, event)}
            className={`flex items-center justify-between bg-myCustomBackground text-${isDark  ? 'white' : 'black'} p-1 rounded-2 w-full box-border mb-0`}
            >

      <Task task={task} onToggle={() => handleToggle(index)} darkMode={isDark } />
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
            <AddTask onAdd={handleAddTask} 
            flag = {flag}
            setFlag ={setFlag}/>
          </div>
          </div>
      )}
    </div>
   );
};


export default TaskManager;
