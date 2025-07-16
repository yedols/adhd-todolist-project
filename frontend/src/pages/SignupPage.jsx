import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerWithEmail } from '../services/auth';
import { sendTokenToBackend } from '../services/api';
import { getMessaging, getToken } from "firebase/messaging";
import { messaging } from '../firebase/firebase-config.js'; // messaging 객체 import

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
      const idToken = await registerWithEmail(email, password);

      // ✅ FCM 푸시 토큰 발급
      let fcmToken = '';
      try {
        fcmToken = await getToken(messaging, {
          vapidKey: "BCNmtBCc9Cdpg5lrkFOgeOzrj8TUQqfCe6Yt9sGwSf3hiChzA3PhhOAbOmotrT2bBBNp1fUA99b8EyBBAPwUQb4", // Vite 환경 변수로 대체 권장
        });
        console.log("🎯 FCM Token:", fcmToken);
      } catch (err) {
        console.warn("❗ FCM 토큰 발급 실패:", err.message);
      }

      // ✅ 백엔드에 전송
      await sendTokenToBackend(idToken, fcmToken);

      alert('회원가입 완료!');
      navigate('/login');
    } catch (err) {
      console.error("회원가입 실패:", err);
      if (err.code === "auth/email-already-in-use") {
        alert("이미 가입된 이메일입니다.");
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
