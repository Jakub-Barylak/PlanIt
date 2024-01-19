// components/Task.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface TaskProps {
  task: { text: string; completed: boolean };
  onToggle: () => void;
  darkMode: boolean;
  //onRemove: () => void;
}

const Task: React.FC<TaskProps> = ({ task, onToggle, darkMode }) => (
<div className="flex items-center list-none">
<label
      className={`flex items-center p-2 rounded-md 
                  ${task.completed ? (darkMode ? 'bg-transparent' : 'bg-transparent') : 'bg-transparent'}
                  ${task.completed ? 'border-none' : 'border-none'}
                  ${task.completed ? 'cursor-not-allowed' : 'cursor-pointer'}
                  ${!darkMode ? 'first:border-gray-300' : ''}`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggle}
        className={`mr-8 cursor-pointer rounded-md w-4 h-4
                    ${task.completed ? (darkMode ? 'bg-gray-700' : 'bg-gray-400') : 'bg-white'}
                    ${task.completed ? 'appearance-none' : 'border border-gray-300'}
                    transition-background duration-300 ease-in-out`}
      />
      <span
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        className={`${darkMode ? 'text-gray-500' : 'text-gray-500' }`}
      >
      {task.text}
      </span>
    </label>
    
  </div>
);

export default Task;
