import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

// components
import ClassListItem from './reschedule_LeaveClassListItem';
import ProcessNav, {
  ItemWrapper,
  ItemWrapperRight,
  Hint,
  ActionButton
} from '../ui/processNav';

// contexts
import { userStatusContext } from '../contexts/userStatusContext';
import { rescheduleContext } from '../contexts/rescheduleContext';

// functions
import keyGen from '../../functions/keyGen';

const NavWrapper = styled.div`
  margin-top: 4rem;
`;

const Instruction = styled.p`
  font-weight: 500;
  margin-bottom: 3rem;
`;

const LeaveClassList = ({ history }) => {
  /** Get reschedulable classes from leaveRecord */
  const { leaveRecord } = useContext(userStatusContext);
  const { reschedulable = [] } = leaveRecord;

  /** nav handlers */
  const { leaveClass, toNextStep } = useContext(rescheduleContext);
  const toIndex = () => {
    history.push('/');
  };
  const nextStepHandler = () => {
    if (!leaveClass) {
      alert('請選擇請假課堂');
    } else {
      toNextStep();
    }
  };

  return (
    <div className="container-fluid px-0">
      <Instruction>選擇請假課堂</Instruction>
      <div className="row">
        <ul className="col-12 col-md-6">
          {reschedulable.length &&
            reschedulable.map((date) => {
              return <ClassListItem date={date} key={keyGen()} />;
            })}
        </ul>
      </div>
      <div className="row">
        <NavWrapper className="col-12">
          <ProcessNav>
            <ItemWrapper>
              <Hint>上一步</Hint>
              <ActionButton onClick={toIndex}>回首頁</ActionButton>
            </ItemWrapper>
            <ItemWrapperRight>
              <Hint>下一步</Hint>
              <ActionButton onClick={nextStepHandler}>
                選擇補課課堂
              </ActionButton>
            </ItemWrapperRight>
          </ProcessNav>
        </NavWrapper>
      </div>
    </div>
  );
};

export default withRouter(LeaveClassList);
