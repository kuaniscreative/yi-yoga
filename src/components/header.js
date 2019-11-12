import React from "react";

const Header = ({signOut}) => {
    return (
        <div id="header">
            <button onClick={signOut}>登出</button>
        </div>
    );
};

export default Header;
