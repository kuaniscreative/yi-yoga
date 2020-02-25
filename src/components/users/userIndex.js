import React, { useContext } from 'react';
import styled from 'styled-components';

// components
import TitleBlock from '../ui/titleBlock';
import Block from '../ui/block';
import ArrowIconLink from '../ui/arrowIconLink';

// contexts
import { userContext } from '../contexts/userContext';

const LinkWrapper = styled.div`
  margin-bottom: 2rem;
`;

const UserIndex = () => {
  const { validated, nickName } = useContext(userContext);

  return (
    <div id="userPanel">
      <TitleBlock title={`嗨，${nickName}`}>今天運動了嗎？</TitleBlock>
      {validated ? (
        <Block>
          <LinkWrapper>
            <ArrowIconLink to="/register-classes">報名課程</ArrowIconLink>
          </LinkWrapper>
          <LinkWrapper>
            <ArrowIconLink to="/leave-application">請假</ArrowIconLink>
          </LinkWrapper>
          <LinkWrapper>
            <ArrowIconLink to="/reschedule">補課安排</ArrowIconLink>
          </LinkWrapper>
        </Block>
      ) : (
        <Block>
          <ul className="comfyList">
            <li>等待芝伊確認帳號之後才可以報名課程</li>
          </ul>
        </Block>
      )}
    </div>
  );
};

export default UserIndex;
