
import React, { useEffect, useState } from 'react';
import TodoItem from '../components/TodoItem';
import FooterNav from '../components/FooterNav';

export default function TodoListFilledPage() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const newTodo = localStorage.getItem('newTodo');
    const editTodo = localStorage.getItem('editTodo');

    if (newTodo) {
      const parsed = JSON.parse(newTodo);
      setTodos(prev => [...prev, parsed]);
      localStorage.removeItem('newTodo');
    }

    if (editTodo) {
      const parsed = JSON.parse(editTodo);
      setTodos(prev => prev.map((todo, i) => (i === parsed.index ? parsed : todo)));
      localStorage.removeItem('editTodo');
    }
  }, []);

  const handleDelete = (index) => {
    setTodos(prev => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    const todo = todos[index];
    localStorage.setItem('editTodo', JSON.stringify({ ...todo, index }));
    window.location.href = '/create';
  };

  return (
    <div className="page">
      <div className="header">YYYY-MM-DD (Mon)</div>
      <input type="text" placeholder="Search" />
      {todos.map((todo, idx) => (
        <TodoItem
          key={idx}
          time={todo.time}
          text={todo.text}
          onDelete={() => handleDelete(idx)}
          onEdit={() => handleEdit(idx)}
        />
      ))}
      <FooterNav />
    </div>
  );
}
