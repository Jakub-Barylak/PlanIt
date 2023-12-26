// DailyPlanner.tsx
import React from 'react';
import TaskManager from './TaskManager';

const App: React.FC = () => {
  const initialTasks = [
    { text: 'Task 1', completed: false },
    { text: 'Task 2', completed: true },
  ];

  return (
    <div>
      <h2>Daily Planner</h2>
      <TaskManager initialTasks={initialTasks} />
    </div>
  );
};

export default App;
