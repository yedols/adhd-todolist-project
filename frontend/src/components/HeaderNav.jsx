
import React from 'react';
import { useNavigate } from 'react-router-dom';

// 오늘 날짜를 YYYY-MM-DD (Mon) 형식으로 포맷
function getFormattedDate() {
  const today = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const date = String(today.getDate()).padStart(2, '0');
  const day = days[today.getDay()];
  return `${year}-${month}-${date} (${day})`;
}

// 페이지 상단에 표시되는 헤더 컴포넌트
// - 왼쪽: 오늘 날짜
// - 오른쪽: 로그아웃 버튼 (누르면 토큰 삭제 후 /login으로 이동)
export default function HeaderWithLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('editTodo');
      navigate('/login');
    }
  };

  return (
    <div
      className="header"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.8rem 1rem',
        borderBottom: '1px solid #ddd'
      }}
    >
      {/* 왼쪽 날짜 표시 */}
      <h3 style={{ margin: 0 }}>{getFormattedDate()}</h3>

      {/* 오른쪽 로그아웃 버튼 */}
      <button className="button-small" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
}