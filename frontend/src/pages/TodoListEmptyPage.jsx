import React from 'react';
import { useNavigate } from 'react-router-dom';
import FooterNav from '../components/FooterNav';
import HeaderNav from '../components/HeaderNav';

export default function TodoListEmptyPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTodos = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/todo/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error('할 일 불러오기 실패');

        const data = await res.json();
        if (data.length > 0) {
          navigate('/filled');
        }
      } catch (err) {
        console.error(err);
        alert('할 일 목록 확인 실패');
      } finally {
        setLoading(false);
      }
    };

    checkTodos();
  }, []);

  if (loading) return null;

  return (
    <div className="page">
      <HeaderNav />   {/* 헤더에 날짜/로그아웃 기능*/}
      <p>등록된 일정이 없습니다.</p>
      <FooterNav />
    </div>
  );
}