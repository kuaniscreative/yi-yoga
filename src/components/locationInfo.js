import React from 'react';
import styled from 'styled-components';

// components
import TitleBlock from './ui/titleBlock';
import Block from './ui/block';
import ArrowIconLink from './ui/arrowIconLink';

const LocationWrapper = styled.div`
  margin-bottom: 2rem;
`;

const LocationTitle = styled.div`
  margin-bottom: 1rem;
  font-weight: 500;
  line-height: 1.5em;
`;

const LocationInfo = () => {
  return (
    <div id="locationInfo">
      <TitleBlock title="上課地點" />
      <Block>
        <LocationWrapper>
          <LocationTitle>古亭</LocationTitle>
          <ul className="comfyList">
            <li>地址：台北市大安區潮州街78巷1號</li>
            <li>古亭捷運站步行5分鐘</li>
            <li>需自備瑜珈墊，墊子可放教室</li>
          </ul>
        </LocationWrapper>
        <LocationWrapper>
          <LocationTitle>欣跳運動工作室 Heartbeat Fitness Studio</LocationTitle>
          <ul className="comfyList">
            <li>地址：長安東路一段24-2號2樓</li>
            <li>善導寺捷運站步行8分鐘</li>
            <li>無需自備瑜珈墊</li>
          </ul>
        </LocationWrapper>
      </Block>
      <Block>
        <ArrowIconLink to="/">回首頁</ArrowIconLink>
      </Block>
    </div>
  );
};

export default LocationInfo;
