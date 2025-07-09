import React from 'react';
import { useNavigate } from 'react-router-dom';
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
      <div className="header">YYYY-MM-DD (Mon)</div>
      <input type="text" placeholder="Search" />
      <p>등록된 일정이 없습니다.</p>
      <FooterNav />
    </div>
  );
}
