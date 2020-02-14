import React from 'react';
import { Link } from 'react-router-dom';

const LocationInfo = () => {
  return (
    <div id="locationInfo">
      <div className="layout_pageTitle">
        <div className="wrapper">
          <h1>上課地點</h1>
        </div>
      </div>
      <div className="layout_contentBlock">
        <p className="location_title">古亭</p>
        <ul className="comfyList">
          <li>地址：台北市大安區潮州街78巷1號</li>
          <li>古亭捷運站步行5分鐘</li>
          <li>需自備瑜珈墊，墊子可放教室</li>
        </ul>
        <p className="ch-eg-name location_title">
          欣跳運動工作室 <span>Heartbeat Fitness Studio</span>
        </p>
        <ul className="comfyList">
          <li>地址：長安東路一段24-2號2樓</li>
          <li>善導寺捷運站步行8分鐘</li>
          <li>無需自備瑜珈墊</li>
        </ul>
        <div className="nextStepButtonsArea--notFixed">
          <Link to="/" className="outlineButton">
            回首頁
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
