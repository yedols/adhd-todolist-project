import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // useLocation 추가
import { LayoutList, CircleUserRound} from 'lucide-react'; // 아이콘 적용

export default function FooterNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCheckClick = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/todo/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('할 일을 불러오지 못했습니다');

      const todos = await res.json();

      if (todos.length === 0 && location.pathname !== '/empty') {
        navigate('/empty');
      } else if (todos.length > 0 && location.pathname !== '/filled') {
        navigate('/filled');
      }
    } catch (err) {
      console.error(err);
      alert('할 일 확인 중 오류 발생');
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
