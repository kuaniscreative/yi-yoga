import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// comopnent
import ArrowIconLink from '../ui/arrowIconLink';

const ResultTitle = styled.div`
  margin-bottom: 3rem;
  font-weight: 500;
  font-size: 1.5rem;
`;

const ActionWrapper = styled.div`
  margin: 3rem 0;
`;

const Success = () => {
  return (
    <div>
      <ResultTitle>報名成功</ResultTitle>
      <ul className="comfyList">
        <li>
          請在付款後前往{' '}
          <Link to="/userStatus">
            <u>課程狀態</u>
          </Link>{' '}
          填寫付款通知
        </li>
      </ul>
      <ActionWrapper>
        <ArrowIconLink to="/">回首頁</ArrowIconLink>
      </ActionWrapper>
    </div>
  );
};

export default Success;
