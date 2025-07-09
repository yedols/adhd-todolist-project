import React, { useEffect, useState } from 'react';
import TodoItem from '../components/TodoItem';
import FooterNav from '../components/FooterNav';

function getFormattedDate() {
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
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('로그인이 필요합니다');

        const res = await fetch('http://localhost:8000/api/todo/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error('ToDo 불러오기 실패');

        const data = await res.json();
        setTodos(data);
      } catch (err) {
        console.error(err);
        alert('할 일을 불러오는 데 실패했습니다.');
      }
    };

    fetchTodos();
  }, []);

  // 🗑 서버 기반 삭제는 아직 구현되지 않았으므로 UI만 제거
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    // 실제 삭제 기능은 추후 API 연동 시 구현 필요
  };

  // ✏ 수정은 현재 미구현 → /create로 이동 + 기존 내용 넘기려면 구현 필요
  const handleEdit = (todo) => {
    localStorage.setItem('editTodo', JSON.stringify(todo));
    window.location.href = '/create';
  };

  return (
    <div className="page">
      <div className="header">{getFormattedDate()}</div>
      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {todos
        .filter(todo => todo.text.toLowerCase().includes(searchText.toLowerCase()))
        .map((todo) => (
          <TodoItem
            key={todo.id}
            time={todo.start_time}
            text={todo.text}
            onDelete={() => handleDelete(todo.id)}
            onEdit={() => handleEdit(todo)}
          />
      ))}
      <FooterNav />
    </div>
  );
}
