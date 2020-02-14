import React from 'react';
import { Link } from 'react-router-dom';

// components
import Container from '../ui/container';
import Row from '../ui/row';

const SignUpSuccess = () => {
  return (
    <div>
      <div className="layout_pageTitle">
        <div className="wrapper">
          <h1>註冊成功</h1>
        </div>
      </div>
      <div className="layout_contentBlock">
        <ul className="comfyList">
          <li>要等待芝伊確認過後才能開始報名</li>
          <li>確認後會寄 email 通知你</li>
        </ul>
        <div className="container-fluid">
          <div className="row py-5">
            <div className="col-12">
              <Link to="/" className="outlineButton">
                確認
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpSuccess;
