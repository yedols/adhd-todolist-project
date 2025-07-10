import React, { useEffect, useState } from 'react';
import TodoItem from '../components/TodoItem';
import FooterNav from '../components/FooterNav';
import HeaderNav from '../components/HeaderNav';


export default function TodoListFilledPage() {
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('로그인이 필요합니다');

        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/todo/me`, {
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

const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem('accessToken');
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/todo/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error('삭제 실패');
    }

    // UI에서 제거
    setTodos(todos.filter(todo => todo.id !== id));
  } catch (err) {
    console.error(err);
    alert('할 일 삭제에 실패했습니다.');
  }
};


  const handleEdit = (todo) => {
    localStorage.setItem('editTodo', JSON.stringify(todo));
    window.location.href = '/create';
  };

  const handleToggle = async (id, is_checked) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, is_checked } : todo
      )
    );

    try {
      const token = localStorage.getItem('accessToken');
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/todo/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ is_checked })
      });
    } catch (err) {
      console.error('체크 상태 업데이트 실패:', err);
      alert('서버에 상태를 저장하지 못했습니다.');
    }
  };

  return (
    <div className="page">
      <HeaderNav />   {/* 헤더에 날짜/로그아웃 기능*/}
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
            todo={todo}
            onDelete={() => handleDelete(todo.id)}
            onEdit={() => handleEdit(todo)}
            onToggle={handleToggle}
          />
        ))}
      <FooterNav />
    </div>
  );
}
