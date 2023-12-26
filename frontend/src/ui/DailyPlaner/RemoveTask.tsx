// components/RemoveTask.tsx
import React from 'react';

interface RemoveTaskProps {
  onRemove: () => void;
}

const RemoveTask: React.FC<RemoveTaskProps> = ({ onRemove }) => (
  <span role="img" aria-label="Delete" onClick={onRemove}>
  🗑️
</span>
);

export default RemoveTask;
