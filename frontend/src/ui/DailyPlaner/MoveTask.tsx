// MoveTask.tsx
import React from 'react';
import { useDrag } from 'react-dnd';


interface MoveTaskProps {
  onMove: (dragIndex: number, hoverIndex: number) => void;
  index: number;
}

const MoveTask: React.FC<MoveTaskProps> = ({ onMove, index }) => {
  const handleDragStart = (e: React.DragEvent<HTMLSpanElement>) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };


  return (
    <span
    draggable
    onDragStart={handleDragStart}
    style={{ cursor: 'grab' }}
    role="img"
    aria-label="Move"
  >
    &#x2630;
  </span>
  );
  };

export default MoveTask;
