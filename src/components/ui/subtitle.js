import React from 'react';
import styled from 'styled-components';

import theme from '../../json/theme.json';

const Title = styled.h1`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 2em;
`;

const Subtitle = (props) => {
  const { title } = props;
  return (
    <div>
      <Title>{title}</Title>
    </div>
  );
};

export default Subtitle;
