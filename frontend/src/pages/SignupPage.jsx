import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerWithEmail } from '../services/auth';
import { sendTokenToBackend } from '../services/api';

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



 const handleSignup = async () => {
  if (!email.includes('@') || !email.includes('.')) {
    alert('올바른 이메일 형식을 입력해주세요.');
    return;
  }

  try {
    const token = await registerWithEmail(email, password);
    await sendTokenToBackend(token);
    alert('회원가입 완료!');
    navigate('/login');       //회원가입 후 로그인 페이지로 넘어감
  } catch (err) {
    console.error("회원가입 실패:", err);
    if (err.code === "auth/email-already-in-use") {
    alert("이미 가입된 이메일입니다. 로그인하거나 다른 이메일을 사용하세요.");
  } else if (err.code === "auth/invalid-email") {
    alert("유효하지 않은 이메일입니다.");
  } else if (err.code === "auth/weak-password") {
    alert("비밀번호는 6자 이상이어야 합니다.");
  } else {
    alert("회원가입 중 알 수 없는 오류가 발생했습니다.");
  }
  }
};

  return (
    <div className="login-background">
      <img src="/logo.png" alt="로고" className="login-logo" />
      <div className="login-form">
        <h2>회원가입</h2>
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
        <button onClick={handleSignup}>회원가입</button>
        <button className="secondary-button" onClick={() => navigate('/')}>뒤로가기</button>
      </div>
    </div>
  );
}
