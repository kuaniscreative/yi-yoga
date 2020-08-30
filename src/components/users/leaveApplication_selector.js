import React, { useContext, useState, Fragment } from 'react';
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
  ActionButton,
} from '../ui/processNav';

// contexts
import { leaveContext } from '../contexts/leaveContext';
import { userContext } from '../contexts/userContext';
import { loadingContext } from '../contexts/loadingContext';

// actions
import { leaveApplication } from '../../actions/leaveApplication';
import { userStatusContext } from '../contexts/userStatusContext';
import ConfirmModal from '../modals/ConfirmModal';

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
    leaveRecord &&
    leaveRecord.stamps &&
    leaveRecord.stamps.map((stamp) => {
      return stamp.split('/').map((str) => {
        return parseInt(str, 10);
      });
    });

  const [modalIsOn, setModalIsOn] = useState(false);
  const leaveApplicate = (reschedulable) => {
    setLoadingBarActive(true);

    if (modalIsOn) {
      setModalIsOn(false)
    }

    return leaveApplication(userInfo, leaveTarget.id, reschedulable).then(() => {
      setLoadingBarActive(false);
      history.push('/leave-application/success');
    });
  };
  const onClick = () => {
    const isAvailable = checkAvailable(stamps, leaveTarget.date);

    if (isAvailable) {
      return leaveApplicate(true);
    } else {
      setModalIsOn(true);
    }
  };

  return (
    <Fragment>
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
              <ActionButton onClick={onClick}>請假</ActionButton>
            </ItemWrapperRight>
          </ProcessNav>
        </Block>
      </div>
      <ConfirmModal
        isOpen={modalIsOn}
        closeModal={() => {
          setModalIsOn(false);
        }}
        content="本月份已請過假，本次請假將無法補課，是否繼續？"
        confirmText="是"
        cancelText="否"
        onConfirm={() => leaveApplicate(false)}
      />
    </Fragment>
  );
};

export default withRouter(Selector);
