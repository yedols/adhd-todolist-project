import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TodoCreateModal() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [ampm, setAmpm] = useState('AM');
  const [hour, setHour] = useState('09');
  const [minute, setMinute] = useState('00');
  const [interval, setInterval] = useState('30');
  const [editId, setEditId] = useState(null);

  // 수정 모드일 경우 localStorage에서 todo 정보를 가져옴
useEffect(() => {
  const editTodo = localStorage.getItem('editTodo');
  if (editTodo) {
    try {
      const { id, text, time, interval } = JSON.parse(editTodo);
      setEditId(id);
      setText(text);
      setInterval(interval);

      if (typeof start_time === 'string' && start_time.includes('T')) {
        const timePart = new Date(start_time).toLocaleTimeString('en-US', { hour12: true });
          const [h, m, rest] = timePart.split(':');
          const ampm = rest.includes('AM') ? 'AM' : 'PM';
          setHour(h.padStart(2, '0'));
          setMinute(m.padStart(2, '0'));
          setAmpm(ampm);
        }
    } catch (e) {
      console.warn('editTodo parsing 실패:', e);
    }
  }
}, []);

// 등록/수정 공통 처리 함수
const handleSubmit = async () => {
  const hour24 = ampm === 'PM' ? String((parseInt(hour) % 12) + 12).padStart(2, '0') : hour;
  const start_time = new Date(`2025-07-08T${hour24}:${minute}:00`).toISOString();
  let parsedInterval = parseInt(interval, 10);
if (isNaN(parsedInterval)) {
  parsedInterval = 30; // 반복 주기 기본값 30분으로 설정
}

  const todo = {
    text,
    start_time,
    interval_minutes: parsedInterval,
    is_checked: false,
    last_notified_time: null
  };


  try {
    const token = localStorage.getItem('accessToken');
    const endpoint = editId
      ? `${import.meta.env.VITE_API_BASE_URL}/api/todo/${editId}`
      : `${import.meta.env.VITE_API_BASE_URL}/api/todo/`;
    const method = editId ? 'PATCH' : 'POST';       //일정 수정인지 등록인지에 따라 보내지는 곳 다르게

    const res = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // ✅ 꼭 Bearer 포함!
      },
      body: JSON.stringify(todo)
    });
    
    if (!res.ok) throw new Error('저장 실패');
      localStorage.removeItem('editTodo');
      navigate('/filled');
    } catch (err) {
      console.error(err);
      alert('저장 중 오류 발생');
    }
  };
//     if (!res.ok) {
//       throw new Error('할 일 생성 실패');
//     }

//     const data = await res.json();
//     console.log('📌 ToDo 생성 성공:', data);
//     navigate('/filled');
//   } catch (err) {
//     alert('할 일 등록에 실패했습니다. 다시 시도해주세요.');
//     console.error(err);
//     console.log('📤 보낼 todo 데이터:', todo);
//   }
// };

  const hourOptions = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minuteOptions = ['00', ...Array.from({ length: 11 }, (_, i) => String((i + 1) * 5).padStart(2, '0'))]; // 5분 간격 수정

  return (
    <div className="modal">
      {/* 상단 헤더 - 닫기, 제목, 로그아웃, 저장 버튼 */}
      <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'left' }}>
          <button onClick={() => navigate(-1)}>❌</button>
        </div>
        <h2>{editId ? '일정 수정' : '일정 등록'}</h2>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'right' }}>
          <button onClick={handleSubmit}>✔</button>
        </div>
      </div>
      <input type="text" placeholder="할 일" value={text} onChange={e => setText(e.target.value)} />  {/* 할 일 입력 */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>                  {/* 시간 선택 */}
        <select value={ampm} onChange={e => setAmpm(e.target.value)}>
          <option value="AM">오전</option>
          <option value="PM">오후</option>
        </select>
        <select value={hour} onChange={e => setHour(e.target.value)}>
          {hourOptions.map(h => <option key={h}>{h}</option>)}
        </select>
        <span>:</span>
        <select value={minute} onChange={e => setMinute(e.target.value)}>
          {minuteOptions.map(m => <option key={m}>{m}</option>)}
        </select>
      </div>

      {/* 알림 주기 */}
      <div style={{ marginTop: '1rem' }}>
        <label>⏱ 알림 주기 (분 단위)</label>
        <select value={interval} onChange={e => setInterval(e.target.value)}>
          {[...Array(6)].map((_, i) => {
            const val = (i + 1) * 10;
            return <option key={val} value={val}>{val}분</option>;
          })}
        </select>
      </div>

      <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
        ⏰ 시간 설정 없으면 30분 간격으로 알림드립니다.
      </p>
    </div>
  );
}
