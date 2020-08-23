import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';

// components
import DateSingle from '../ui/dateSingle';

// contexts
import { leaveContext } from '../contexts/leaveContext';
import { userStatusContext } from '../contexts/userStatusContext';

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

const DisableHint = styled.div`
  flex: 0 0 72px;
  text-align: right;
  font-size: 0.75rem;
  color: ${theme.colors.gray2};
`;
const DateWrapper = styled.div`
  flex: 1 0;
`;

const disabledCheckMarkStyle = {
  border: `1px solid ${theme.colors.gray2}`
};

const Checkmark = ({ changeHandler, checked, disabled }) => {
  return (
    <div className="checkboxContainer">
      <input
        type="radio"
        name="leaveDate"
        onChange={changeHandler}
        checked={checked}
      />
      <div
        className="checkmark"
        style={disabled ? disabledCheckMarkStyle : null}
      ></div>
    </div>
  );
};

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

const ClassListItem = ({ classInfo }) => {
  /** checked logic */
  const { leaveTarget, setLeaveTarget } = useContext(leaveContext);
  const selectTarget = () => {
    setLeaveTarget(classInfo);
  };

  const isSelected = useMemo(() => {
    if (!leaveTarget || !classInfo) return false

    return leaveTarget.id === classInfo.id;
  }, [classInfo, leaveTarget])
  

  /** disabled logic */
  const { leaveRecord } = useContext(userStatusContext);
  const stamps =
    leaveRecord &&
    leaveRecord.stamps.map((stamp) => {
      return stamp.split('/').map((str) => {
        return parseInt(str, 10);
      });
    });

  const isAvailable = checkAvailable(stamps, classInfo.date);

  return (
    <ListItem>
      <ListWrapper>
        <CheckmarkWrapper>
          <Checkmark
            changeHandler={isAvailable ? selectTarget : () => {}}
            checked={isSelected}
            disabled={!isAvailable}
          />
        </CheckmarkWrapper>
        <DateWrapper>
          <DateSingle date={classInfo.date} disabled={!isAvailable} />
        </DateWrapper>
        {isAvailable ? null : <DisableHint>無法請假</DisableHint>}
      </ListWrapper>
    </ListItem>
  );
};

export default ClassListItem;
