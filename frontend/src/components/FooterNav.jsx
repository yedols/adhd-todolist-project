import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // useLocation 추가
import { LayoutList, CircleUserRound, Plus } from 'lucide-react'; // 아이콘 적용

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
  };

  return (
    <div className="footer-nav">
      <button onClick={handleCheckClick} className="footer-btn left-btn">
        <LayoutList size={26} strokeWidth={2.2} />
      </button>
      <button onClick={() => navigate('/create')} className="footer-btn center-btn">+</button>
      <button onClick={() => navigate('/notice')} className="footer-btn right-btn">
        <CircleUserRound size={26} strokeWidth={2.2} />
      </button>
    </div>
  );
}
