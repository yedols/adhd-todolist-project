import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h2>로그인</h2>
      <input type="text" placeholder="아이디(이메일)" />
      <input type="password" placeholder="비밀번호" />
      <button onClick={() => navigate('/filled')}>로그인</button>
      <button onClick={() => navigate('/signup')}>회원가입</button>
    </div>
  );
}
