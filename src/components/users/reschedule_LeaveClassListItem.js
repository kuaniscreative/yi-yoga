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

const ClassListItem = ({ date, selected, changeHandler }) => {
  /** checked logic */
  const { leaveClass, setLeaveClass } = useContext(rescheduleContext);
  const selectTarget = useCallback(() => {
    setLeaveClass(date);
  }, [date, setLeaveClass]);
  const isChecked = leaveClass
    ? leaveClass.valueOf() === date.valueOf()
    : false;

  return (
    <ListItem>
      <ListWrapper>
        <CheckmarkWrapper>
          <Checkmark changeHandler={selectTarget} checked={isChecked} />
        </CheckmarkWrapper>
        <DateWrapper>
          <DateSingle date={date} />
        </DateWrapper>
      </ListWrapper>
    </ListItem>
  );
};

export default ClassListItem;
