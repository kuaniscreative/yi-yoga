import React from "react";

const NextStepButtonsArea = ({ action, cancel, actionName, cancelName }) => {
    return (
        <div className="nextStepButtonsArea">
            <button className="outlineButton" onClick={action}>
                { actionName ? actionName : '確認' }
            </button>
            <button className="cancelGray" onClick={cancel}>
                {cancelName ? cancelName : '取消'}
            </button>
        </div>
    );
};

export default NextStepButtonsArea;
