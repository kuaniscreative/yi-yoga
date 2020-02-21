import React from 'react';
import styled from 'styled-components';

// data
import theme from '../../json/theme.json';

const CardBase = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 400px;
  padding: 32px 24px;
  border-radius: 16px;
  border: 1px solid ${theme.colors.gray1};
  /* box-shadow: 0 0 20px -14px gray; */
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: normal;
`;
const ListWrapper = styled.ul`
  position: relative;
  width: 100%;
  max-height: 80%;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const List = styled.li`
  position: relative;
  padding: 16px 0;
  border-bottom: 1px solid ${theme.colors.gray1};
`;

const ListCard = (props) => {
  const { title, children } = props;
  return (
    <CardBase>
      <Title>{title}</Title>
      <ListWrapper>
        {children &&
          children.map((child) => {
            return <List>{child}</List>;
          })}
      </ListWrapper>
    </CardBase>
  );
};

export default ListCard;
