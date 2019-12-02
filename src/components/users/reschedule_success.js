import React from "react";
import { Link } from "react-router-dom";

// components
import StepIndicator from "../stepIndicator";

const RescheduleSuccess = ({ status }) => {
    const pendingOutput = () => {
        return (
            <div className="innerContent">
                <p className="resultMessage_title">已安排補課</p>
                <p className="resultMessage_text">
                    有人請假的時候會照候補順序自動安排。候補上時會寄email通知你。
                </p>
                <div className="nextStepButtonsArea--notFixed">
                    <Link to="/" className="outlineButton">
                        回首頁
                    </Link>
                </div>
            </div>
        );
    };

    const successOutput = () => {
        return (
            <div className="innerContent">
                <p className="resultMessage_title">補課完成</p>
                <p className="resultMessage_text">親愛的我們到時見</p>
                <div className="nextStepButtonsArea--notFixed">
                    <Link to="/" className="outlineButton">
                        回首頁
                    </Link>
                </div>
            </div>
        );
    };
    const output = () => {
        switch (status) {
            case "success":
                return successOutput();
            case "pending":
                return pendingOutput();
            default:
                break;
        }
    };
    return (
        <div id='reschedule_success'>
            <StepIndicator indicator="補課結果" />
            {output()}
        </div>
    );
};

export default RescheduleSuccess;
