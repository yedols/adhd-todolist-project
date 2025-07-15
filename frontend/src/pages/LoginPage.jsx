import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";
import { messaging } from "../firebase/firebase-config.js"; // Firebase 앱 초기화된 파일
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 🔔 알림 권한 요청
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        console.log("🔔 알림 권한:", permission);
      });
    }
  }, []);

  const handleLogin = async () => {
    const auth = getAuth();

    try {
      // ✅ Firebase 로그인
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      localStorage.setItem('accessToken', idToken);

      // ✅ FCM 푸시 토큰 발급
      let fcmToken = '';
      try {
        fcmToken = await getToken(messaging, {
          vapidKey: "BCNmtBCc9Cdpg5lrkFOgeOzrj8TUQqfCe6Yt9sGwSf3hiChzA3PhhOAbOmotrT2bBBNp1fUA99b8EyBBAPwUQb4",
        });
        console.log("🎯 FCM Token:", fcmToken);
      } catch (err) {
        console.warn("❗ FCM 토큰 발급 실패:", err.message);
      }

      // ✅ 백엔드에 로그인 및 FCM 토큰 전송
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        fcm_token: fcmToken,
      }, {
        headers: {
          Authorization: `Bearer ${idToken}`,
	  "Content-Type": "application/json",
        }
      });

      // ✅ 성공 시 페이지 이동
      navigate("/filled");
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

