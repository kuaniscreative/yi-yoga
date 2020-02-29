import React from 'react';
import styled from 'styled-components';

// data
import theme from '../../json/theme.json';

const { gray3, gray1 } = theme.colors;

const ListWrapper = styled.ul`
  padding: 24px 16px;
  border-radius: 16px;
  box-shadow: 0 0 16px -8px ${gray3};
`;

export const ListTitle = styled.div`
  font-weight: 500;
  padding: 16px 0;
`;

export const ListItem = styled.li`
  display: flex;
  padding: 16px;
  border-bottom: 1px solid ${gray1};
  @media (max-width: 576px) {
    padding: 16px 8px;
  }
`;

const List = (props) => {
  return <ListWrapper>{props.children}</ListWrapper>;
};

export default List;
