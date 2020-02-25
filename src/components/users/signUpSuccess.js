import React from 'react';

// components
import TitleBlock from '../ui/titleBlock';
import Block from '../ui/block';
import ArrowIconLink from '../ui/arrowIconLink';

const SignUpSuccess = () => {
  return (
    <div>
      <TitleBlock title="註冊成功" />
      <Block>
        <ul className="comfyList">
          <li>要等待芝伊確認過後才能開始報名</li>
          <li>確認後會寄 email 通知你</li>
        </ul>
      </Block>
      <Block>
        <ArrowIconLink to="/">回首頁</ArrowIconLink>
      </Block>
    </div>
  );
};

export default SignUpSuccess;
