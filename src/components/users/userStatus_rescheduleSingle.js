import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const RescheduleSingle = ({
    pendingClassInfo,
    rescheduleClassInfo,
    uid
}) => {
    const pendingDate = pendingClassInfo && pendingClassInfo.classDate;
    const rescheduleDate = rescheduleClassInfo && rescheduleClassInfo.classDate;
    const reschedulePendingOutput = () => {
        const date = pendingDate && pendingDate.toDate();
        const yyyy = date && date.getFullYear();
        const mm = date && date.getMonth() + 1;
        const dd = date && date.getDate();
        const dateString =  yyyy ? `${yyyy}年${mm}月${dd}日` : null;
        const userIndex = pendingClassInfo && pendingClassInfo.pendingStudents.indexOf(uid) + 1;
        return (
            <div className="RescheduleSingle">
                <p name="title">{dateString}</p>
                <ul className="comfyList">
                        <li>
                            {`候補中，順位：${userIndex}`}
                            <br />
                            <span className="action">
                                <Link to="/reschedule">取消候補</Link>
                            </span>
                        </li>
                    </ul>
            </div>
        );
    };
    const rescheduledOutput = () => {
        const date = rescheduleDate && rescheduleDate.toDate();
        const yyyy = date && date.getFullYear();
        const mm = date && date.getMonth() + 1;
        const dd = date && date.getDate();
        const dateString =  yyyy ? `${yyyy}年${mm}月${dd}日` : null;
        return (
            <div className="RescheduleSingle">
                <p name="title">{dateString}</p>
                <ul className="comfyList">
                        <li>
                            已補上，我們到時見
                        </li>
                    </ul>
            </div>
        );
    }

    return (
        <div>
            {pendingDate ? reschedulePendingOutput() : null}
            {rescheduleDate ? rescheduledOutput() : null}
        </div>
    )
};

export default RescheduleSingle;
