import React, { useContext } from 'react';
import styled from 'styled-components';

// components
import DateSingle from '../ui/dateSingle';

// contexts
import { leaveContext } from '../contexts/leaveContext';

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

const ClassListItem = ({ classInfo }) => {
  const { leaveTargetId, setLeaveTargetId } = useContext(leaveContext);
  const selectTarget = () => {
    setLeaveTargetId(classInfo.id);
  };
  const isSelected = leaveTargetId === classInfo.id;
  return (
    <ListItem>
      <ListWrapper>
        <CheckmarkWrapper>
          <Checkmark changeHandler={selectTarget} checked={isSelected} />
        </CheckmarkWrapper>
        <DateSingle date={classInfo.date} />
      </ListWrapper>
    </ListItem>
  );
};

export default ClassListItem;
