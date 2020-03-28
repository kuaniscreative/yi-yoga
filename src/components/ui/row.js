import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const Row = (props) => {
  const { extraClass, children } = props;
  return (
    <Section className={`row justify-content-center ${extraClass}`}>
      {children}
    </Section>
  );
};

export default Row;
