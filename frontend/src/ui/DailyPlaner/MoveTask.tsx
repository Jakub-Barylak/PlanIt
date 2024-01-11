// MoveTask.tsx
import React from 'react';
import Image from 'next/image';


interface MoveTaskProps {
  onMove: (dragIndex: number, hoverIndex: number) => void;
  index: number;
}

const MoveTask: React.FC<MoveTaskProps> = ({ onMove, index }) => {
  const handleDragStart = (e: React.DragEvent<HTMLSpanElement>) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };


  return (
    <div
    draggable
    onDragStart={handleDragStart}
    style={{
      cursor: 'grab',
      width: '18px', 
      height: '18px', 
    }}
  >
    <Image
        src="/icons/drag-todo.svg" 
        alt="Move"
        width={15} 
        height={10} 
      />
  </div>
  );
  };

export default MoveTask;
