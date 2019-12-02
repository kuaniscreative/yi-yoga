import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

const Success = ({clearSuccessMessage}) => {
    return (
        <div className="layout_contentBlock">
            <p className="resultMessage_title">課程新增成功</p>
            <p className="resultMessage_message">
                同學現在可以報名課程了
            </p>
            <div className="nextStepButtonsArea--notFixed">
                <Link to="/admin" className="outlineButton" onClick={() => {clearSuccessMessage('NEW_SESSION')}}>
                    回首頁
                </Link>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        clearSuccessMessage: target => {
            const output = `CLEAR_SUCCESS_MESSAGE_${target}`;
            dispatch({ type: output });
        }
    };
};


export default connect(null, mapDispatchToProps)(Success);