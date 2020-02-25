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
const TextWrapperLeft = styled.span`
  padding-left: 0.5rem;
  font-weight: 500;
  font-size: 1.25rem;
`;

const ArrowFlip = styled(Arrow)`
  transform: rotate(180deg);
`;

const ArrowIconLink = (props) => {
  const { to, pointTo, children } = props;

  if (pointTo === 'left') {
    return (
      <StyledLink to={to}>
        <ArrowFlip width="24" height="24" />
        <TextWrapperLeft>{children}</TextWrapperLeft>
      </StyledLink>
    );
  }
  return (
    <StyledLink to={to}>
      <TextWrapper>{children}</TextWrapper>
      <Arrow width="24" height="24" />
    </StyledLink>
  );
};

export default ArrowIconLink;
