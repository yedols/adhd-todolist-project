import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Check } from 'lucide-react';      //아이콘 적용

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
      const { id, text, start_time, interval } = JSON.parse(editTodo);
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

  const hourOptions = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minuteOptions = ['00', ...Array.from({ length: 11 }, (_, i) => String((i + 1) * 5).padStart(2, '0'))]; // 5분 간격 수정

  return (
    <div className="create-modal-bg">
      {/* 상단 헤더 - 닫기, 제목, 로그아웃, 저장 버튼 */}
      <div className="create-modal-card">
          <div className="modal-header-row">
            <button onClick={() => navigate(-1)} className="icon-button no-bg">
              <X size={33} strokeWidth={2.5} />
            </button>
            <span className="modal-title">{editId ? '일정 수정' : '일정 등록'}</span>
            <button onClick={handleSubmit} className="icon-button no-bg">
              <Check size={33} strokeWidth={2.5} />
            </button>
          </div>

        <input type="text" placeholder="할 일 등록하세요." value={text} onChange={e => setText(e.target.value)} className="input-todo" />  {/* 할 일 입력 */}
        
        <div className="time-select-group">                  {/* 시간 선택 */}
          <label className="modal-label">⏰ 목표 시간</label>
          <div className="time-select-row">
            <select value={ampm} onChange={e => setAmpm(e.target.value)} className="pill-select blue">
            <option value="AM">오전</option>
            <option value="PM">오후</option>
            </select>
            <select value={hour} onChange={e => setHour(e.target.value)} className="pill-select blue">
              {hourOptions.map(h => <option key={h}>{h}</option>)}
            </select>
            <span style={{ fontWeight: "bold", marginBottom: "2.5rem"}}>:</span>
            <select value={minute} onChange={e => setMinute(e.target.value)} className="pill-select blue">
              {minuteOptions.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
        </div>

        {/* 알림 주기 */}
          <label className="modal-label" style={{ marginTop: '1.5rem' }}>⏱ 알림 주기 (분 단위)</label>
          <select value={interval} onChange={e => setInterval(e.target.value)} className="pill-select red">
            {[...Array(6)].map((_, i) => {
              const val = (i + 1) * 10;
              return <option key={val} value={val}>{val}분</option>;
            })}
          </select>
          <span className="interval-desc">간격으로 알림 발송</span>

        <p className="notice-text"> *알림 주기설정 하지 않으면 30분 간격으로 알림 드립니다. </p>
      </div>
    </div>
  );
}
