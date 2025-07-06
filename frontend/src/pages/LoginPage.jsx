import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithEmail } from '../services/auth';
import { sendTokenToBackend } from '../services/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const token = await loginWithEmail(email, password); // 🔐 Firebase 로그인
      await sendTokenToBackend(token); // 🚀 FastAPI에 토큰 전달
      alert('로그인 성공!');
      navigate('/filled');
    } catch (err) {
      console.error(err);
      alert('로그인 실패!');
    }
  };

  return (
    <div className="container">
      <h2>로그인</h2>
      <input
        type="text"
        placeholder="아이디(이메일)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
      <button onClick={() => navigate('/signup')}>회원가입</button>
    </div>
  );
}
