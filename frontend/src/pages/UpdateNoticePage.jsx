import React from 'react';
import FooterNav from '../components/FooterNav';
import HeaderNav from '../components/HeaderNav';

export default function UpdateNoticePage() {
  return (
    <div className="page">
      <HeaderNav /> {/* 헤더에 날짜/로그아웃 기능*/}
      <p>⚠️ 서비스 업데이트 예정입니다.</p>
      <FooterNav />
    </div>
  );
}
