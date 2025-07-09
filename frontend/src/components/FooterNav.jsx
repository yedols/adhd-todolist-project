import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // ✅ useLocation 추가

export default function FooterNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCheckClick = () => {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');

    if (todos.length === 0 && location.pathname !== '/empty') {
      navigate('/empty');
    } else if (todos.length > 0 && location.pathname !== '/filled') {
      navigate('/filled');
    }
    // If already on correct page, do nothing
  };

  return (
    <div className="footer-nav">
      <button onClick={handleCheckClick}>✔</button>
      <button onClick={() => navigate('/create')}>➕</button>
      <button onClick={() => navigate('/notice')}>👤</button>
    </div>
  );
}
