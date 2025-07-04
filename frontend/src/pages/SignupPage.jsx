import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h2>회원가입</h2>
      <input type="text" placeholder="아이디(이메일)" />
      <input type="password" placeholder="비밀번호" />
      <button onClick={() => navigate('/filled')}>회원가입</button>
      <button onClick={() => navigate('/')}>뒤로가기</button>
    </div>
  );
}
