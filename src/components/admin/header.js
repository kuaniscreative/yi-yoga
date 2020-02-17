import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import theme from '../../json/theme.json';

// components
const NavIconBtn = styled.button`
  padding: 16px;
  transform: translate(16px, 0);
`;

const NavIcon = styled.span`
  display: inline-block;
  position: relative;
  width: 20px;
  height: 10px;

  &::after,
  &::before {
    content: '';
    display: block;
    position: absolute;
    height: 2px;
    background: ${theme.colors.black};
  }

  &::before {
    width: 100%;
    top: 0;
  }

  &::after {
    width: 72%;
    bottom: 0;
  }
`;

const HeaderWrapper = styled.header`
  display: block;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 3;
`;

const Row = styled.div`
  height: 56px;
`;

const NavArea = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LogoArea = styled.div`
  font-weight: 500;
  color: ${theme.colors.black};
`;

const Header = (props) => {
  const { navIsActive, setNavIsActive } = props;

  const handleClick = () => {
    setNavIsActive(!navIsActive);
  };

  const hideMenu = () => {
    setNavIsActive(true);
  };

  return (
    <HeaderWrapper>
      <div className="container">
        <Row className="row justify-content-center align-items-center">
          <LogoArea className="col-6 col-md-5 col-lg-5">
            <Link to="/" onClick={hideMenu}>
              芝伊瑜珈
            </Link>
          </LogoArea>
          <NavArea className="col-6 col-md-5 col-lg-5">
            <NavIconBtn onClick={handleClick}>
              <NavIcon />
            </NavIconBtn>
          </NavArea>
        </Row>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
