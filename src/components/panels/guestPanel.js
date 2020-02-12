import React from 'react';
import { Link } from 'react-router-dom';

const GuestPanel = () => {
  return (
    <div id="guestPanel">
      <div className="heroMessage">
        <div className="heroMessage_main">
          <p>最強凍齡瑜伽</p>
          <p>沒有芝伊</p>
        </div>
        <div className="heroMessage_sub">
          <p>----的最強課程管理系統</p>
        </div>
      </div>
      <Link to="/log-in" className="outlineButton">
        登入
      </Link>
      <Link to="/register" className="outlineButton">
        註冊
      </Link>
    </div>
  );
};

export default GuestPanel;
