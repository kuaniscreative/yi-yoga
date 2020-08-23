import React, { useContext } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

// components
import ClassList from './leaveApplication_classList';
import TitleBlock from '../ui/titleBlock';
import Block from '../ui/block';
import ProcessNav, {
  ItemWrapper,
  ItemWrapperRight,
  Hint,
  ActionButton
} from '../ui/processNav';

// contexts
import { leaveContext } from '../contexts/leaveContext';
import { userContext } from '../contexts/userContext';
import { loadingContext } from '../contexts/loadingContext';

// actions
import { leaveApplication } from '../../actions/leaveApplication';
import { userStatusContext } from '../contexts/userStatusContext';

const Instruction = styled.div`
  margin-bottom: 3rem;
`;

function checkAvailable(stamps, date) {
  const classMonth = date.getMonth() + 1;
  const classYear = date.getFullYear();

  for (const stamp of stamps) {
    const [year, month] = stamp;
    if (year === classYear && month === classMonth) {
      return false;
    }
  }

  return true;
}

const Selector = ({ history }) => {
  const { leaveTarget } = useContext(leaveContext);
  const userInfo = useContext(userContext);
  const { setLoadingBarActive } = useContext(loadingContext);
  const toIndex = () => {
    history.push('/leave-application/success');
  };

  const { leaveRecord } = useContext(userStatusContext);
  const stamps =
    leaveRecord 
    && leaveRecord.stamps
    && leaveRecord.stamps.map((stamp) => {
      return stamp.split('/').map((str) => {
        return parseInt(str, 10);
      });
    });

  
  const leaveApplicate = () => {
    const isAvailable = checkAvailable(stamps, leaveTarget.date);

    if (isAvailable) {
      setLoadingBarActive(true);
      leaveApplication(userInfo, leaveTarget.id).then(() => {
        setLoadingBarActive(false);
        history.push('/leave-application/success');
      });
    } else {
      
    }
  };

  return (
    <div>
      <TitleBlock title="請假" />
      <Block>
        <Instruction>選擇請假日期</Instruction>
        <ClassList />
      </Block>
      <Block>
        <ProcessNav>
          <ItemWrapper>
            <Hint>上一步</Hint>
            <ActionButton onClick={toIndex}>回首頁</ActionButton>
          </ItemWrapper>
          <ItemWrapperRight>
            <Hint>下一步</Hint>
            <ActionButton onClick={leaveApplicate}>請假</ActionButton>
          </ItemWrapperRight>
        </ProcessNav>
      </Block>
    </div>
  );
};

export default withRouter(Selector);
