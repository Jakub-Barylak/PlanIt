// components/Task.tsx
import React from 'react';

interface TaskProps {
  task: { text: string; completed: boolean };
  onToggle: () => void;
  //onRemove: () => void;
}

const Task: React.FC<TaskProps> = ({ task, onToggle }) => (
  <li>
    <label>
      <input type="checkbox" checked={task.completed} onChange={onToggle} />
      {task.text}
    </label>
  </li>
);

export default Task;
