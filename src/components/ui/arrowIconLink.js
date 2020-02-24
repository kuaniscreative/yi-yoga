import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Arrow } from '../../static/arrow.svg';

const StyledLink = styled(Link)`
  display: inline-flex;
  position: relative;
  align-items: center;
`;

const TextWrapper = styled.span`
  padding-right: 0.5rem;
  font-weight: 500;
  font-size: 1.25rem;
`;

const ArrowIconLink = (props) => {
  const { to, children } = props;
  return (
    <StyledLink to={to}>
      <TextWrapper>{children}</TextWrapper>
      <Arrow width="24" height="24" />
    </StyledLink>
  );
};

export default ArrowIconLink;
