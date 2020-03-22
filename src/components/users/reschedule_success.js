import React from 'react';
import styled from 'styled-components';

// components
import Block from '../ui/block';
import ArrowIconLink from '../ui/arrowIconLink';

const ResultTitle = styled.div`
  margin-bottom: 3rem;
  font-weight: 500;
  font-size: 1.5rem;
`;

const ActionWrapper = styled.div`
  margin: 6rem 0 3rem;
`;

const Success = ({ rescheduleType }) => {
  return (
    <Block>
      <ResultTitle>
        {rescheduleType === 'add' ? '補課安排完成' : '已安排候補'}
      </ResultTitle>
      {rescheduleType === 'pending' ? (
        <ul className="comfyList">
          <li>有人請假的時候會照候補順序自動安排。候補上時會寄email通知你。</li>
        </ul>
      ) : null}
      <ActionWrapper>
        <ArrowIconLink to="/">回首頁</ArrowIconLink>
      </ActionWrapper>
    </Block>
  );
};

export default Success;
