// MoveTask.tsx
import React from 'react';

interface MoveTaskProps {
  onMove: () => void;
}

const MoveTask: React.FC<MoveTaskProps> = ({ onMove }) => (
  <span role="img" aria-label="Move" onClick={onMove}>
    --
  </span>
);

export default MoveTask;
