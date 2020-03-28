import React, { useState } from 'react';
import styled from 'styled-components';

// components
import TitleBlock from '../ui/titleBlock';
import Block from '../ui/block';
import ButtonGroup from '../ui/buttonGroup';
import ClassList from './userStatus_classList';
import Payments from './userStatus_payments';
import Arrangements from './userStatus_arrangements';

const NavButton = styled.button`
  font-weight: 500;
  font-size: 0.9rem;
  @media (mex-width: 576px) {
    font-size: 0.75rem;
  }
`;

const UserStatus = () => {
  const [view, setView] = useState('classList');
  const changeView = (e) => {
    const view = e.target.getAttribute('name');
    setView(view);
  };
  const views = {
    classList: <ClassList />,
    payments: <Payments />,
    arrangements: <Arrangements />
  };

  return (
    <div>
      <TitleBlock title="課程狀態" />
      <Block>
        <ButtonGroup>
          <NavButton name="classList" onClick={changeView}>
            所有課程
          </NavButton>
          <NavButton name="payments" onClick={changeView}>
            繳費狀態
          </NavButton>
          <NavButton name="arrangements" onClick={changeView}>
            請假 & 補課
          </NavButton>
        </ButtonGroup>
      </Block>
      <Block>{views[view]}</Block>
    </div>
  );
};

export default UserStatus;
