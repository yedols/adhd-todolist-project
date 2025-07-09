import React from 'react';
import { useNavigate } from 'react-router-dom';
import FooterNav from '../components/FooterNav';
import HeaderNav from '../components/HeaderNav';

export default function TodoListEmptyPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    if (todos.length > 0) {
      navigate('/filled');
    }
  }, []);

  return (
    <div className="page">
      <HeaderNav />   {/* 헤더에 날짜/로그아웃 기능*/}
      <input type="text" placeholder="Search" />
      <p>등록된 일정이 없습니다.</p>
      <FooterNav />
    </div>
  );
}
