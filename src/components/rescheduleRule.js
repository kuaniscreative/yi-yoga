import React from "react";
import { Link } from "react-router-dom";

// components
import StepIndicator from "./stepIndicator";

const RescheduleRule = () => {
    return (
        <div id="rescheduleRule">
            <div className="layout_pageTitle">
                <div className="wrapper">
                    <h1>補課規則</h1>
                </div>
            </div>
            <div className="layout_contentBlock">
                <ul className="comfyList">
                    <li>請假之課程可於兩個月內申請補課</li>
                    <li>如果當前沒有任何空位，可安排候補</li>
                    <li>候補課堂有人請假時，會依照候補順序補上</li>
                    <li>候補上時你將會收到一封通知信</li>
                    <li>不可同時候補多堂課</li>
                    <li>如果沒有候補上且該課堂已開始，你將可以再次安排候補</li>
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

export default RescheduleRule;
