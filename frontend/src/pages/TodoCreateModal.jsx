import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TodoCreateModal() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [ampm, setAmpm] = useState('AM');
  const [hour, setHour] = useState('09');
  const [minute, setMinute] = useState('00');
  const [interval, setInterval] = useState('30');

  useEffect(() => {
      const editTodo = localStorage.getItem('editTodo');
      if (editTodo) {
        const { text, time, interval } = JSON.parse(editTodo);
        const [h, m_ampm] = time.split(':');
        const [m, ap] = m_ampm.split(' ');
        setText(text);
        setHour(h);
        setMinute(m);
        setAmpm(ap);
        setInterval(interval);
      }
    }, []);

  const handleSubmit = () => {
    const todo = {
      interval,
      time: `${hour}:${minute} ${ampm}`,
      text
    };
    
    const isEditing = localStorage.getItem('editTodo');
    if (isEditing) {
      const { index } = JSON.parse(isEditing);
      todo.index = index;
      localStorage.setItem('editTodo', JSON.stringify(todo));
    } else {
      localStorage.setItem('newTodo', JSON.stringify(todo));
    }
    navigate('/filled');
  };

  const hourOptions = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minuteOptions = ['00', ...Array.from({ length: 11 }, (_, i) => String((i + 1) * 5).padStart(2, '0'))]; // 5분 간격 수정

  return (
    <div className="modal">
      <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => navigate(-1)}>❌</button>
        <h3>할일 등록 하세요.</h3>
        <button onClick={handleSubmit}>✔</button>
      </div>
      <input type="text" placeholder="할 일" value={text} onChange={e => setText(e.target.value)} />
      <div style={{ display: 'flex', gap: '0.5rem' }}>
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
