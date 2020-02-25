import React from 'react';
import styled from 'styled-components';

// components
import TitleBlock from '../ui/titleBlock';
import Block from '../ui/block';
import ArrowIconLink from '../ui/arrowIconLink';

const LinkWrapper = styled.div`
  margin-bottom: 2rem;
`;

const GuestIndex = () => {
  return (
    <div>
      <TitleBlock title="歡迎來到芝伊瑜珈">
        透過不間斷的瑜珈練習，打開身體的覺知，也更能體驗生命的美
      </TitleBlock>
      <Block>
        <LinkWrapper>
          <ArrowIconLink to="/log-in">登入</ArrowIconLink>
        </LinkWrapper>
        <LinkWrapper>
          <ArrowIconLink to="/signUp">註冊</ArrowIconLink>
        </LinkWrapper>
      </Block>
    </div>
  );
};

export default GuestIndex;
