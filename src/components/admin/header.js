import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const { navIsActive, setNavIsActive } = props;

  const handleClick = () => {
    setNavIsActive(!navIsActive);
  };

  const hideMenu = () => {
    setNavIsActive(true);
  };

  return (
    <div id="headerRefac">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-6 col-md-5 col-lg-5" id="header_logoArea">
            <Link to="/" onClick={hideMenu}>
              芝伊瑜珈
            </Link>
          </div>
          <div className="col-6 col-md-5 col-lg-5" id="header_btnArea">
            <div id="menuButtonRefac" onClick={handleClick}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
