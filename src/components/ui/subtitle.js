import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 2em;
`;

const Title = styled.h1`
  margin-bottom: 0.5em;
  font-size: 1.5rem;
  line-height: 2em;
  font-weight: 500;
`;

const Subtitle = (props) => {
  const { title, children } = props;
  return (
    <Wrapper>
      <Title>{title}</Title>
      <p>{children}</p>
    </Wrapper>
  );
};

export default Subtitle;
