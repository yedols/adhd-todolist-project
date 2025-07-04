import React from 'react';
import FooterNav from '../components/FooterNav';

export default function TodoListEmptyPage() {
  return (
    <div className="page">
      <div className="header">YYYY-MM-DD (Mon)</div>
      <input type="text" placeholder="Search" />
      <p>등록된 일정이 없습니다.</p>
      <FooterNav />
    </div>
  );
}
