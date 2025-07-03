
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FooterNav() {
  const navigate = useNavigate();
  return (
    <div className="footer-nav">
      <button onClick={() => navigate('/empty')}>✔</button>
      <button onClick={() => navigate('/create')}>➕</button>
      <button onClick={() => navigate('/notice')}>👤</button>
    </div>
  );
}
