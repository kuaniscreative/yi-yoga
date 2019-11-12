import React from "react";
import { Link } from "react-router-dom";

const NextStepButtonsArea = ({ action, back }) => {
    return (
        <div className="nextStepButtonsArea">
            <button className="outlineButton" onClick={action}>
                確認
            </button>
            <Link to="/" className="cancelGray">
                取消
            </Link>
        </div>
    );
};

export default NextStepButtonsArea;
