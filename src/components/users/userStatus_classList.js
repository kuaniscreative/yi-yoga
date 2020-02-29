import React, { useContext } from 'react';
import styled from 'styled-components';

// components
import List, { ListItem } from '../ui/bottomLineList';

// contexts
import { userStatusContext } from '../contexts/userStatusContext';

// data
import theme from '../../json/theme.json';

const { gray3, gray1 } = theme.colors;

const ClassList = () => {
  const { userClasses, rescheduleClasses } = useContext(userStatusContext);
  return (
    <div>
      <List></List>
    </div>
  );
};

export default ClassList;
