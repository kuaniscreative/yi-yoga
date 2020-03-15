import React, { useContext } from 'react';
import styled from 'styled-components';

// components
import Block from '../ui/block';
import LeaveClassList from './reschedule_LeaveClassList';

// contexts
import { userStatusContext } from '../contexts/userStatusContext';

const Hint = styled.p`
  font-weight: 500;
  margin-bottom: 3rem;
`;

const ClassSelectorBlock = () => {
  const { leaveRecord } = useContext(userStatusContext);
  const { reschedulable = [] } = leaveRecord;

  return (
    <Block>
      <Hint>請選擇請假課堂</Hint>
      <div className="container-fluid px-0">
        <div className="row">
          <LeaveClassList />
        </div>
      </div>
    </Block>
  );
};

export default ClassSelectorBlock;
