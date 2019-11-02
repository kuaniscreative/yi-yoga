import React from "react";
import { Link } from "react-router-dom";

const LeaveApplicationSuccess = () => {
    return (
        <div className="innerContent">
            <p className='resultMessage_title'>請假成功</p>
            <div className="nextStepButtonsArea">
                <Link to="/" className="outlineButton">
                    回首頁
                </Link>
            </div>
        </div>
    );
};

export default LeaveApplicationSuccess;
