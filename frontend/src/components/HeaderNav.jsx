import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';          //아이콘 적용

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
    <div className="header-nav">
        <div className="header-second-line">
          {/* 로고 이미지 */}
          <img src="/logo.png" alt="로고" className="header-logo" />

          {/* 오른쪽 로그아웃 버튼 */}
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={20}/>
            <span>로그아웃</span>
          </button>
        </div>
        {/* 왼쪽 날짜 표시 */}
        <div className="header-date">{getFormattedDate()}</div>
    </div>
  );
}