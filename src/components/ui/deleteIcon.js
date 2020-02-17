import React from 'react';
import styled from 'styled-components';

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
  border: 1px solid #ff9a9e;
  border-radius: 28px;

  &:after,
  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    position: absolute;
    top: calc(50% - 0.5px);
    background: #ff9a9e;
    transform-origin: center center;
  }
  &:after {
    transform: rotate(-45deg) scaleX(0.66);
  }
  &:before {
    transform: rotate(45deg) scaleX(0.66);
  }
`;

const DeleteIcon = () => {
  return <IconWrapper />;
};

export default DeleteIcon;
