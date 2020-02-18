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
  padding-right: 4px;
  font-weight: 500;
  font-size: 1rem;
`;

const ArrowIconLink = (props) => {
  const { to, children } = props;
  return (
    <StyledLink to={to}>
      <TextWrapper>{children}</TextWrapper>
      <Arrow width="28" height="28" />
    </StyledLink>
  );
};

export default ArrowIconLink;
