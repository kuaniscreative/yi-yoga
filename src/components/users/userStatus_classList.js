import React, { useContext } from 'react';
import styled from 'styled-components';

// contexts
import { userStatusContext } from '../contexts/userStatusContext';

// data
import theme from '../../json/theme.json';

const { gray3, gray1 } = theme.colors;

const List = styled.ul`
  padding: 24px 16px;
  border-radius: 16px;
  box-shadow: 0 0 16px -8px ${gray3};
`;

const ClassList = () => {
  const { userClasses, rescheduleClasses } = useContext(userStatusContext);
  return (
    <div>
      <ul></ul>
    </div>
  );
};

export default ClassList;
