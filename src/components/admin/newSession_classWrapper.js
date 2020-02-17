import React from 'react';
import styled from 'styled-components';

// data
import theme from '../../json/theme.json';

const Wrapper = styled.div`
  width: 100%;
  padding: 1.5rem 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid ${theme.colors.gray2};
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1em;
`;

const ClassWrapper = (props) => {
  const { courseInfo, classes } = props;
  return (
    <Wrapper>
      <Title>{courseInfo.name}</Title>
      <ul>
        <li>
          <div>123123</div>
        </li>
        <li>
          <div>123123</div>
        </li>
        <li>
          <div>123123</div>
        </li>
      </ul>
    </Wrapper>
  );
};

export default ClassWrapper;
