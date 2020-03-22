import React, { useContext } from 'react';
import styled from 'styled-components';

// components
import ClassListItem from './reschedule_availableClassListItem';
import ProcessNav, {
  ItemWrapper,
  ItemWrapperRight,
  Hint,
  ActionButton
} from '../ui/processNav';

// contexts
import { rescheduleContext } from '../contexts/rescheduleContext';
import { userContext } from '../contexts/userContext';
import { loadingContext } from '../contexts/loadingContext';

// actions
import rescheduleAdd from '../../actions/rescheduleAdd';
import reschedulePending from '../../actions/reschedulePending';

// functions
import keyGen from '../../functions/keyGen';

const NavWrapper = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
`;

const Instruction = styled.p`
  font-weight: 500;
  margin-bottom: 3rem;
`;

const AvailableClassList = () => {
  /** Get variables from context */
  const {
    rescheduleTarget,
    leaveClass,
    availableClasses,
    toNextStep,
    toPrevStep
  } = useContext(rescheduleContext);
  const userInfo = useContext(userContext);
  const { setLoadingBarActive } = useContext(loadingContext);

  /** reschedule action */
  const reschedule = () => {
    setLoadingBarActive(true);
    const handler = rescheduleTarget.isFull ? reschedulePending : rescheduleAdd;
    return handler(rescheduleTarget.id, userInfo, leaveClass).then(() => {
      setLoadingBarActive(false);
      toNextStep();
    });
  };

  return (
    <div className="container-fluid px-0">
      <Instruction>選擇想補課的課堂，沒有空位時會安排候補</Instruction>
      <div className="row">
        <ul className="col-12 col-md-6">
          {availableClasses.length &&
            availableClasses.map((classInfo) => {
              return <ClassListItem classInfo={classInfo} key={keyGen()} />;
            })}
        </ul>
      </div>
      <div className="row">
        <NavWrapper className="col-12">
          <ProcessNav>
            <ItemWrapper>
              <Hint>上一步</Hint>
              <ActionButton onClick={toPrevStep}>選擇請假課堂</ActionButton>
            </ItemWrapper>
            <ItemWrapperRight>
              <Hint>下一步</Hint>
              <ActionButton
                onClick={() => {
                  reschedule();
                }}
              >
                登記補課
              </ActionButton>
            </ItemWrapperRight>
          </ProcessNav>
        </NavWrapper>
      </div>
    </div>
  );
};

export default AvailableClassList;
