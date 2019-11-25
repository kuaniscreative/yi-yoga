import React from "react";

const NextStepButtonsArea = ({ action, cancel }) => {
    return (
        <div className="nextStepButtonsArea">
            <button className="outlineButton" onClick={action}>
                確認
            </button>
            <button className="cancelGray" onClick={cancel}>
                取消
            </button>
        </div>
    );
};

export default NextStepButtonsArea;
