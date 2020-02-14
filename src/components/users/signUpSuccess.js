import React from 'react';
import { Link } from 'react-router-dom';

// components
import Container from '../ui/container';
import Row from '../ui/row';

const SignUpSuccess = () => {
  return (
    <Container>
      <Row>
        <div className="col-10 col-md-10">
          <h1>註冊成功</h1>
        </div>
      </Row>
      <Row>
        <div className="col-10 col-md-10">
          <ul className="comfyList">
            <li>需要等待芝伊確認過後才能開始報名</li>
            <li>芝伊確認後會寄 email 通知你</li>
          </ul>
        </div>
      </Row>
      <Row>
        <div className="col-10 col-md-10">
          <Link to="/" className="outlineButton">
            確認
          </Link>
        </div>
      </Row>
    </Container>
  );
};

export default SignUpSuccess;
