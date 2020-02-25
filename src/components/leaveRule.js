import React from 'react';

// components
import TitleBlock from './ui/titleBlock';
import Block from './ui/block';
import ArrowIconLink from './ui/arrowIconLink';

const LeaveRule = () => {
  return (
    <div id="leaveRule">
      <TitleBlock title="請假規則" />
      <Block>
        <ul className="comfyList">
          <li>每月只能請假一次</li>
          <li>需在課程開始前兩小時完成請假申請</li>
          <li>請假之課程可於兩個月內申請補課</li>
          <li>上課的人很多，補課空間很小，請盡量不要請假</li>
        </ul>
      </Block>
      <Block>
        <ArrowIconLink to="/">回首頁</ArrowIconLink>
      </Block>
    </div>
  );
};

export default LeaveRule;
