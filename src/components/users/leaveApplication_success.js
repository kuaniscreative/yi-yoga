import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

// components
import StepIndicator from '../stepIndicator';

const LeaveApplicationSuccess = ({clearSuccessMessage}) => {
    return (
        <div className="layout_contentBlock">
            <StepIndicator indicator='請假結果'/>
            <p className="resultMessage_title">請假成功</p>
            <p className="resultMessage_action">
                <Link to='/reschedule'>現在去安排補課 &rarr;</Link>
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
