import React from "react";
import { Link } from 'react-router-dom';

const Header = () => {

    const handleClick = () => {
        const sideMenu = document.getElementById('sideMenu');
        sideMenu.classList.toggle('active');
    }

    const hideMenu = () => {
        const sideMenu = document.getElementById('sideMenu');
        sideMenu.classList.remove('active');
    }

    return (
        <div id="header">
            <div id='menuButton' onClick={handleClick}>
                
            </div>
            <Link to='/' id='siteName' onClick={hideMenu}>
                芝伊瑜珈
            </Link>
        </div>
    );
};

export default Header;
