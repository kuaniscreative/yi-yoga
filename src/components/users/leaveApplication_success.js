import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// components
import TitleBlock from '../ui/titleBlock';
import Block from '../ui/block';
import ArrowIconLink from '../ui/arrowIconLink';

const ActionWrapper = styled.div`
  margin: 3rem 0;
`;

const Success = () => {
  return (
    <div>
      <TitleBlock title="請假成功" />
      <Block>
        <ul className="comfyList">
          <li>
            記得前往{' '}
            <Link to="/reschedule">
              <u>補課頁面</u>
            </Link>{' '}
            安排補課
          </li>
        </ul>
        <ActionWrapper>
          <ArrowIconLink to="/">回首頁</ArrowIconLink>
        </ActionWrapper>
      </Block>
    </div>
  );
};

export default Success;
