import React from "react";
import { Link } from "react-router-dom";

const GuestPanel = () => {
    return (
        <div id="guestPanel">
            <div className='heroMessage'>
                <p>最強凍齡瑜伽</p>
                <p>沒有芝依</p>
            </div>
            <Link to="/log-in" className="outlineButton">
                登入
            </Link>
            <Link to="/register" className="outlineButton">
                註冊
            </Link>
        </div>
    );
};

export default GuestPanel;
