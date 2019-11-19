import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

// actions
import {cancelReschedulePending} from '../../actions/userActions';

const LeaveSingle = ({
    date,
    status,
    pendingClassInfo,
    rescheduleClassInfo,
    uid,
    clearSuccessMessage,
    cancelReschedulePending
}) => {
    const yyyy = date && date.toDate().getFullYear();
    const mm = date && date.toDate().getMonth() + 1;
    const dd = date && date.toDate().getDate();
    const dateString = yyyy ? `${yyyy}年${mm}月${dd}日` : null;
    const statusOutput = () => {
        switch (status) {
            case "rescheduled":
                let rescheduledData = () => {
                    const rescheduleDate =
                        rescheduleClassInfo &&
                        rescheduleClassInfo.classDate.toDate();
                    const yyyy = rescheduleDate && rescheduleDate.getFullYear();
                    const mm = rescheduleDate && rescheduleDate.getMonth() + 1;
                    const dd = rescheduleDate && rescheduleDate.getDate();
                    const dateString = `${yyyy}年${mm}月${dd}日`;
                    return {
                        dateString: dateString
                    };
                };

                return (
                    <ul className="comfyList">
                        <li>{`已安排${rescheduledData().dateString}補課`}</li>
                    </ul>
                );
            case "reschedulePending":
                let reschedulePendingData = () => {
                    const pendingDate =
                        pendingClassInfo && pendingClassInfo.classDate.toDate();
                    const yyyy = pendingDate && pendingDate.getFullYear();
                    const mm = pendingDate && pendingDate.getMonth() + 1;
                    const dd = pendingDate && pendingDate.getDate();
                    const dateString = `${yyyy}年${mm}月${dd}日`;
                    const pendingIndex =
                        pendingClassInfo &&
                        pendingClassInfo.pendingStudents.indexOf(uid) + 1;
                        return {
                            dateString,
                            pendingIndex
                        }
                };
                return (
                    <ul className="comfyList">
                        <li>
                            {`候補${reschedulePendingData().dateString}，順位：${reschedulePendingData().pendingIndex}`}
                            <br />
                            <span className="action">
                                <button onClick={() => {cancelReschedulePending(uid, pendingClassInfo.id)}}>取消候補</button>
                            </span>
                        </li>
                    </ul>
                );
            case "reschedulable":
                return (
                    <ul className="comfyList">
                        <li>
                            尚未補課，
                            <span className="action">
                                <Link to="/reschedule" onClick={() => {clearSuccessMessage('RESCHEDULE')}}>現在去安排</Link>
                            </span>
                        </li>
                    </ul>
                );
            default:
                return null;
        }
    };
    return (
        <div className="leaveSingle">
            <p name="title">{dateString}</p>
            {statusOutput()}
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        clearSuccessMessage: target => {
            const output = `CLEAR_SUCCESS_MESSAGE_${target}`;
            dispatch({ type: output });
        },
        cancelReschedulePending: (userId, pendingClassId) => {
            dispatch(cancelReschedulePending(userId, pendingClassId))
        }
    };
};

export default connect(null, mapDispatchToProps)(LeaveSingle);
