import React from 'react';
import styled from 'styled-components';

// components
import Block from '../ui/block';

// data
import theme from '../../json/theme';

const { gray4 } = theme.colors;

const Message = styled.span`
  color: ${gray4};
`;

const Default = () => {
  return (
    <Block>
      <Message>沒有可以補課的課堂</Message>
    </Block>
  );
};

export default Default;
