import React from 'react';
import { Link } from 'react-router-dom';

// components
import TitleBlock from './ui/titleBlock';
import Block from './ui/block';
import ArrowIconLink from './ui/arrowIconLink';

const RescheduleRule = () => {
  return (
    <div id="rescheduleRule">
      <TitleBlock title="補課規則" />
      <Block>
        <ul className="comfyList">
          <li>請假之課程可於兩個月內申請補課</li>
          <li>如果課堂沒有空位，系統會安排候補</li>
          <li>候補課堂有人請假時，依照候補順序補上</li>
          <li>候補上時你將會收到一封通知信</li>
          <li>
            如果課堂將在兩小時內開始，系統會停止自動安排補課，並寄信詢問你補課的意願
          </li>
          <li>如果沒有候補上且該課堂已開始，系統會退還補課機會</li>
          <li>不可同時候補多堂課</li>
        </ul>
      </Block>
      <Block>
        <ArrowIconLink to="/">回首頁</ArrowIconLink>
      </Block>
    </div>
  );
};

export default RescheduleRule;
