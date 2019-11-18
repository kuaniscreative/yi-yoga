import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

const LeaveApplicationSuccess = (clearSuccessMessage) => {
    return (
        <div className="innerContent">
            <p className="resultMessage_title">請假成功</p>
            <p className="resultMessage_action">
                <Link to='/reschedule'>現在去補課 &rarr;</Link>
            </p>
            <div className="nextStepButtonsArea--notFixed">
                <Link to="/" className="outlineButton" onClick={() => {clearSuccessMessage('RESCHEDULE')}}>
                    回首頁
                </Link>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        clearSuccessMessage: target => {
            const output = `CLEAR_SUCCESS_MESSAGE_${target}`;
            dispatch({ type: output });
        }
    };
};

export default connect(null, mapDispatchToProps)(LeaveApplicationSuccess);
