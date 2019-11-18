import React from "react";
import { Link } from 'react-router-dom';

// components
import StepIndicator from "../stepIndicator";

const PaymentSuccess = () => {
    return (
        <div className='innerContent'>
            <p className="resultMessage_title">已通知芝伊付款訊息</p>
            <div className="nextStepButtonsArea--notFixed">
                <Link to="/" className="outlineButton">
                    回首頁
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
