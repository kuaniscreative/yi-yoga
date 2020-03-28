import React from 'react';
import styled from 'styled-components';

// functions
import keyGen from '../../functions/keyGen';

// data
import theme from '../../json/theme.json';

const { gray4, gray1 } = theme.colors;

const List = styled.div`
  margin-bottom: 3rem;
`;

const ListItem = styled.div`
  padding: 12px;
  border-bottom: 1px solid ${gray1};
`;

const ClassDate = styled.div`
  display: block;
  letter-spacing: normal;
  font-weight: 500;
  margin-bottom: 12px;
`;

const ClassType = styled.div`
  display: block;
  letter-spacing: normal;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${gray4};
`;

const UserClassList = (props) => {
  const { classes } = props;
  return (
    <List>
      {classes.map((classInfo) => {
        return (
          <ListItem key={keyGen()}>
            <ClassDate>{classInfo.name}</ClassDate>
            <ClassType>{classInfo.type}</ClassType>
          </ListItem>
        );
      })}
    </List>
  );
};

export default UserClassList;
