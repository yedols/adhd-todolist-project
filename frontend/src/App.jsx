import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TodoListEmptyPage from './pages/TodoListEmptyPage';
import TodoListFilledPage from './pages/TodoListFilledPage';
import TodoCreateModal from './pages/TodoCreateModal';
import UpdateNoticePage from './pages/UpdateNoticePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
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
