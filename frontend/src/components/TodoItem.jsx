import React from 'react';
import { PencilLine, Trash } from 'lucide-react';     //아이콘 적용

export default function TodoItem({ todo, onDelete, onEdit, onToggle }) {
  const handleDelete = () => {
    if (window.confirm("❗ 정말 삭제하시겠습니까?")) {
      onDelete(todo.id);
    }
  };

  return (
    <div className={`todo-item ${todo.is_checked ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.is_checked}
        onChange={() => onToggle(todo.id, !todo.is_checked)}
      />
      <span>{todo.text}</span>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => onEdit(todo)} className="icon-button">
          <PencilLine size={20} strokeWidth={2.2} />                {/* 수정버튼 */}
        </button>
        <button onClick={handleDelete} className="icon-button">
          <Trash size={20} strokeWidth={2.2} />                     {/* 삭제버튼 */}
        </button>
      </div>
    </div>
  );
}
