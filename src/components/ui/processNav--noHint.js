import React from 'react';
import styled from 'styled-components';

// components
import { ReactComponent as Arrow } from '../../static/arrow.svg';

// data
import theme from '../../json/theme.json';

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Left = styled.div``;

const ItemWrapper = styled.div`
  display: block;
  position: relative;
`;

const ItemWrapperRight = styled(ItemWrapper)`
  text-align: right;
`;

const Hint = styled.div`
  padding-bottom: 1.5em;
  font-weight: 500;
  font-size: 0.75rem;
  color: ${theme.colors.gray3};
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${theme.colors.black};
`;

const ArrowIcon = styled(Arrow)`
  width: 20px;
  height: 20px;
  margin-left: 0.5rem;
`;

const ArrowIconLeft = styled(ArrowIcon)`
  margin: 0;
  margin-right: 0.5rem;
  transform: rotate(180deg);
`;

const ProcessNav = (props) => {
  const { nextAction, nextHandler, prevAction, prevHandler } = props;

  return (
    <div className="container-fluid px-0">
      <div className="row">
        <Left className="col-6">
          <ItemWrapper>
            <ArrowIconLeft />
            <ActionButton onClick={prevHandler}>{prevAction}</ActionButton>
          </ItemWrapper>
        </Left>
        <Right className="col-6">
          <ItemWrapperRight>
            <ActionButton onClick={nextHandler}>{nextAction}</ActionButton>
            <ArrowIcon />
          </ItemWrapperRight>
        </Right>
      </div>
    </div>
  );
};

export default ProcessNav;
