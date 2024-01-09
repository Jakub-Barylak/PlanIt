// components/Task.tsx
import React from 'react';

interface TaskProps {
  task: { text: string; completed: boolean };
  onToggle: () => void;
  darkMode: boolean;
  //onRemove: () => void;
}

const Task: React.FC<TaskProps> = ({ task, onToggle, darkMode }) => (
  <li style={{ display: 'flex', alignItems: 'center', listStyle: 'none' }}>
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        borderRadius: '4px',
        background: task.completed ? (darkMode ? '#333' : 'transparent') : 'transparent',
        color: task.completed
        ? darkMode
          ? '#888' // Tekst jasnoszary w darkMode, gdy zadanie jest wykonane
          : 'gray' // Tekst ciemnoszary w not darkMode, gdy zadanie jest wykonane
        : darkMode
        ? '#ddd' // Tekst jasnoszary w darkMode, gdy zadanie nie jest wykonane
        : 'black', // Kolor tekstu dla niewykonanego zadania w not darkMode
        boxShadow: task.completed ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.1)',
        userSelect: 'none',
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggle}
        style={{
          marginRight: '8px',
          cursor: 'pointer',
          borderRadius: '4px',
          width: '16px',
          height: '16px',
          border: '2px solid #ccc',
          appearance: 'none',
          background: task.completed ? (darkMode ? '#555' : 'gray') : 'white',
          transition: 'background 0.3s ease-in-out',
        }}
      />
      {task.text}
    </label>
  </li>
);

export default Task;
