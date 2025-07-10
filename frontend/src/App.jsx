import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TodoListEmptyPage from './pages/TodoListEmptyPage';
import TodoListFilledPage from './pages/TodoListFilledPage';
import TodoCreateModal from './pages/TodoCreateModal';
import UpdateNoticePage from './pages/UpdateNoticePage';

function App() {
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem('accessToken', token);         // ✅ 토큰 저장
      } else {
        localStorage.removeItem('accessToken');             // ❌ 로그아웃 시 제거
      }
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} /> {/* 로그아웃 관련 파트 */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/empty" element={<TodoListEmptyPage />} />
        <Route path="/filled" element={<TodoListFilledPage />} />
        <Route path="/create" element={<TodoCreateModal />} />
        <Route path="/notice" element={<UpdateNoticePage />} />
      </Routes>
    </Router>
  );
}

export default App;
