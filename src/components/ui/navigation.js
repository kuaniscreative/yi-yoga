import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// components
import Block from './block';

// json
import theme from '../../json/theme.json';

// functions
import keyGen from '../../functions/keyGen';
import { signOut } from '../../functions/auth';

const NavWrapper = styled.nav`
  position: fixed;
  width: 100%;
  max-height: ${(props) => (props.collapse ? 0 : '876px')};
  padding-top: ${(props) => (props.collapse ? 0 : '56px')};
  top: 0;
  background: ${theme.colors.yellowWhite};
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  z-index: 2;
  @media (max-width: 720px) {
    height: 100%;
    overflow: ${(props) => (props.collapse ? 'hidden' : 'scroll')};
  }
`;

const NavSectionTitle = styled.p`
  font-size: 0.75rem;
  color: ${theme.colors.gray3};
`;

const NavSectionLine = styled.p`
  width: 66%;
  height: 1px;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  background: ${theme.colors.gray3};
`;

const NavItem = styled.div`
  display: block;
  position: relative;
  margin-bottom: 1.5em;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${theme.colors.black};
`;

const NavItemSmall = styled.div`
  font-size: 0.75rem;
  text-align: right;

  button,
  a {
    display: block;
    margin-left: auto;
    margin-right: 0;
    margin-bottom: 1.5em;
    font-weight: 500;

    @media (max-width: 720px) {
      margin: 0;
      margin-bottom: 1.5em;
    }
  }
`;

const Navigation = (props) => {
  const { navIsActive, setNavIsActive, setHeaderBackground } = props;
  const { divisions, logoutSection } = props.data;
  const logoutOffset = (3 - divisions.length) * 3;

  const handleClick = () => {
    setNavIsActive(!navIsActive);
  };

  const handleTransition = () => {
    if (navIsActive) {
      setHeaderBackground('white');
    }
  };

  return (
    <NavWrapper collapse={navIsActive} onTransitionEnd={handleTransition}>
      <Block>
        <div className="container-fluid px-0">
          <div className="row">
            {/** Nav Column */
            divisions.map((division) => {
              return (
                <div className="col-10 col-md-3" key={keyGen()}>
                  <NavSectionTitle>{division.name}</NavSectionTitle>
                  <NavSectionLine />
                  {/** Nav Item */
                  division.items.map((item) => {
                    return (
                      <NavItem key={keyGen()}>
                        <Link
                          to={item.path}
                          onClick={handleClick}
                          key={keyGen()}
                        >
                          {item.name}
                        </Link>
                      </NavItem>
                    );
                  })}
                </div>
              );
            })}
            {/** Log out section */
            logoutSection ? (
              <NavItemSmall
                className={`col-10 col-md-3 offset-md-${logoutOffset}`}
              >
                <button onClick={signOut}>登出</button>
              </NavItemSmall>
            ) : (
              <NavItemSmall
                className={`col-10 col-md-3 offset-md-${logoutOffset}`}
              >
                <Link to="/log-in" onClick={handleClick}>
                  登入
                </Link>
                <Link to="/signUp" onClick={handleClick}>
                  註冊
                </Link>
              </NavItemSmall>
            )}
          </div>
        </div>
      </Block>
    </NavWrapper>
  );
};

export default Navigation;
