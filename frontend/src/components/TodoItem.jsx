import React from 'react';

export default function TodoItem({ todo, onDelete, onEdit, onToggle }) {
  const handleDelete = () => {
    if (window.confirm("❗ 정말 삭제하시겠습니까?")) {
      onDelete(todo.id);
    }
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.is_checked}
        onChange={() => onToggle(todo.id, !todo.is_checked)}
      />
      <span>{todo.text}</span>
      <div>
        <button onClick={() => onEdit(todo)}>✏</button>
        <button onClick={handleDelete}>🗑</button> {/* 여기만 수정됨 */}
      </div>
    </div>
  );
}
