import React from "react";
import { Link } from "react-router-dom";

const LeaveRule = () => {
    return (
        <div id="leaveRule">
            <div className="layout_pageTitle">
                <div className="wrapper">
                    <h1>請假規則</h1>
                </div>
            </div>
            <div className="layout_contentBlock">
                <ul className="comfyList">
                    <li>每月只能請假一次</li>
                    <li>需在課程開始前兩小時完成請假申請</li>
                    <li>請假之課程可於兩個月內申請補課</li>
                    <li>上課的人很多，補課空間很小，請盡量不要請假</li>
                </ul>
                <div className="nextStepButtonsArea--notFixed">
                    <Link to="/" className="outlineButton">
                        回首頁
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LeaveRule;
