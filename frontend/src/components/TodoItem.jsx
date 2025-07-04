
import React from 'react';

export default function TodoItem({ time, text, onDelete, onEdit }) {
  const handleDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      onDelete();
    }
  };

  return (
    <div className="todo-item">
      <span>{time}</span>
      <span>{text}</span>
      <div>
        <button onClick={onEdit}>✏</button>
        <button onClick={handleDelete}>🗑</button>
      </div>
    </div>
  );
}
