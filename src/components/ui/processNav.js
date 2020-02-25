import React from 'react';
import styled from 'styled-components';

// components
import { ReactComponent as Arrow } from '../../static/arrow.svg';

// funcitons
import keyGen from '../../functions/keyGen';

// data
import theme from '../../json/theme.json';

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

export const ItemWrapper = styled.div`
  display: block;
  position: relative;
`;

export const ItemWrapperRight = styled(ItemWrapper)`
  text-align: right;
`;

export const Hint = styled.div`
  padding-bottom: 1.5em;
  font-weight: 500;
  font-size: 0.75rem;
  color: ${theme.colors.gray3};
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${theme.colors.black};
`;

// const ArrowIcon = styled(Arrow)`
//   width: 20px;
//   height: 20px;
//   margin-left: 0.5rem;
// `;

// const ArrowIconLeft = styled(ArrowIcon)`
//   margin: 0;
//   margin-right: 0.5rem;
//   transform: rotate(180deg);
// `;

const ProcessNav = (props) => {
  const {
    nextAction,
    nextHandler,
    nextHint,
    prevAction,
    prevHandler,
    prevHint,
    children
  } = props;

  return (
    <div className="container-fluid px-0">
      <div className="row">
        {children.map((child, i) => {
          if (i === 0) {
            return (
              <Left className="col-6" key={keyGen()}>
                {child}
              </Left>
            );
          } else {
            return (
              <Right className="col-6" key={keyGen()}>
                {child}
              </Right>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ProcessNav;
