import React, { useEffect, useState } from 'react';
import TodoItem from '../components/TodoItem';
import FooterNav from '../components/FooterNav';

function getFormattedDate() {                                       // 현재 시간 설정
  const today = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const date = String(today.getDate()).padStart(2, '0');
  const day = days[today.getDay()];
  return `${year}-${month}-${date} (${day})`;
}

export default function TodoListFilledPage() {
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState('');                 // 검색 필터 창

  useEffect(() => {
    let todos = JSON.parse(localStorage.getItem('todos') || '[]');
    const newTodo = localStorage.getItem('newTodo');
    const editTodo = localStorage.getItem('editTodo');

    if (newTodo) {
      const parsed = JSON.parse(newTodo);
      todos.push(parsed);
      localStorage.setItem('todos', JSON.stringify(todos));
      localStorage.removeItem('newTodo');
    }

    if (editTodo) {
      const parsed = JSON.parse(editTodo);
      todos[parsed.index] = parsed;
      localStorage.setItem('todos', JSON.stringify(todos));
      localStorage.removeItem('editTodo');
    }

    setTodos(todos);
  }, []);

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleEdit = (index) => {
    const todo = todos[index];
    localStorage.setItem('editTodo', JSON.stringify({ ...todo, index }));
    window.location.href = '/create';
  };

  return (
    <div className="page">
      <div className="header">{getFormattedDate()}</div>          {/* 시간 적용 */}
      <input type="text" placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}/>         {/* 검색 필터 적용 */}
      {todos
        .filter(todo => todo.text.toLowerCase().includes(searchText.toLowerCase()))
        .map((todo, idx) => (
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
