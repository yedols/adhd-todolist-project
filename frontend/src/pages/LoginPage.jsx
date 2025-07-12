import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithEmail } from '../services/auth';
import { sendTokenToBackend } from '../services/api';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async () => {
  const auth = getAuth();
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();      // ✅ 여기서 토큰 가져오기
    localStorage.setItem('accessToken', token);                // ✅ 여기서 저장
    navigate("/filled"); // 로그인 성공 시 이동
  } catch (error) {
    alert("로그인 실패: " + error.message);
  }
};

  return (
    <div className="login-background">
      <img src="/logo.png" alt="로고" className="login-logo" />
      <div className="login-form">
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
        <button onClick={handleLogin} className="login-button">로그인</button>
        <button className="signup-button" onClick={() => navigate('/signup')}>회원가입</button>
      </div>
    </div>
  );
}
