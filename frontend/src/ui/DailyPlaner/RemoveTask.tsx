// components/RemoveTask.tsx
import React from 'react';
import Image from 'next/image';

interface RemoveTaskProps {
  onRemove: () => void;
}

const RemoveTask: React.FC<RemoveTaskProps> = ({ onRemove }) => (
  //<span role="img" aria-label="Delete" onClick={onRemove}>
 // 🗑️
//</span>

<span role="img" aria-label="Delete" onClick={onRemove}>

<div
    role="img"
    aria-label="Delete"
    onClick={onRemove}
    style={{
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    }}
  >
    <Image
      src="/icons/bin.svg" // Sprawdź, czy ścieżka do obrazka jest poprawna
      alt="Delete"
      width={20} // Dostosuj szerokość obrazka
      height={20} // Dostosuj wysokość obrazka
      style={{ cursor: 'pointer' }}
    />
</div>
  </span>
);

export default RemoveTask;
