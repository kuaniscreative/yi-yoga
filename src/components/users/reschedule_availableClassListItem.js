import React, { useContext, useCallback } from 'react';
import styled from 'styled-components';

// components
import DateSingle from '../ui/dateSingle';

// contexts
import { rescheduleContext } from '../contexts/rescheduleContext';

// data
import theme from '../../json/theme.json';

const ListItem = styled.li`
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${theme.colors.gray1};
`;

const ListWrapper = styled.label`
  display: flex;
  width: 100%;
  align-items: center;
`;

const CheckmarkWrapper = styled.div`
  flex: 0 0 56px;
`;

const DateWrapper = styled.div`
  flex: 1 0;
`;

const Checkmark = ({ changeHandler, checked }) => {
  return (
    <div className="checkboxContainer">
      <input
        type="radio"
        name="leaveDate"
        onChange={changeHandler}
        checked={checked}
      />
      <div className="checkmark"></div>
    </div>
  );
};

const FullDate = styled.div`
  font-weight: 500;
  line-height: 2em;
  letter-spacing: normal;
  color: ${theme.colors.black};
`;

const DateAndMonth = styled.span`
  margin-right: 1rem;
`;

const Time = styled.span`
  font-size: 0.9rem;
  line-height: 1em;
`;

const Infos = styled.div`
  span {
    font-size: 0.9rem;
    line-height: 1em;
    margin-right: 16px;
    letter-spacing: normal;
    color: ${theme.colors.gray4};
  }
`;

const ClassInfo = ({ classInfo }) => {
  const date = classInfo.date;
  const yyyy = date.getFullYear();
  const mm = date.getMonth();
  const dd = date.getDate();

  const availableNum = classInfo.students
    ? classInfo.capacity -
      classInfo.students.length -
      classInfo.rescheduleStudents.length
    : 0;

  const pendingNum = classInfo.pendingStudents
    ? classInfo.pendingStudents.length
    : 0;

  return (
    <div>
      <FullDate>
        <DateAndMonth>{`${yyyy}年${mm + 1}月${dd}日`}</DateAndMonth>
        <Time>{classInfo.type}</Time>
      </FullDate>
      <Infos>
        <span>{`空位： ${availableNum}`}</span>
        <span>|</span>
        <span>{`候補中： ${pendingNum}`}</span>
      </Infos>
    </div>
  );
};

const ClassListItem = ({ classInfo, selected, changeHandler }) => {
  /** checked logic */
  //   const { leaveClass, setLeaveClass } = useContext(rescheduleContext);
  //   const selectTarget = useCallback(() => {
  //     setLeaveClass(date);
  //   }, [date, setLeaveClass]);
  //   const isChecked = leaveClass
  //     ? leaveClass.valueOf() === date.valueOf()
  //     : false;

  return (
    <ListItem>
      <ListWrapper>
        <CheckmarkWrapper>
          <Checkmark />
        </CheckmarkWrapper>
        <DateWrapper>
          <ClassInfo classInfo={classInfo} />
        </DateWrapper>
      </ListWrapper>
    </ListItem>
  );
};

export default ClassListItem;
