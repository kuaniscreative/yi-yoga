import React from 'react';
import styled from 'styled-components';

// components
import Block from './block';

// data
import theme from '../../json/theme';

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.5em;
  color: ${theme.colors.black};
`;

const Text = styled.p`
  max-width: 50%;
  margin-bottom: 2em;
  font-weight: 400;
  line-height: 2em;
  color: ${theme.colors.gray6};
  @media (max-width: 720px) {
    max-width: 100%;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${theme.colors.gray1};
`;

const TitleBlock = (props) => {
  const { title, children } = props;
  return (
    <Block>
      <Title>{title}</Title>
      <Text>{children}</Text>
      <Line />
    </Block>
  );
};

export default TitleBlock;
