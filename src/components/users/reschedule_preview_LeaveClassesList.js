import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class LeaveClassesList extends Component {

    options = () => {
        const leaveRecord = this.props.leaveRecord;
        return (
            leaveRecord &&
            leaveRecord.reschedulable.map((timestamp, i) => {
                const date = timestamp.toDate();
                const yyyy = date.getFullYear();
                const mm = date.getMonth();
                const dd = date.getDate();
                const hr = date.getHours();
                const min = date.getMinutes();
                const startAt = `${hr}:${min}`;
                const day = date.getDay();
                const dayOutput = `週${day.toLocaleString("zh-u-nu-hanidec")}`;
                return (
                    <div
                        className="shadowOption dateHero checkboxContainer_message"
                        key={i}
                        data-month={mm}
                        data-year={yyyy}
                        onClick={(e) => {this.props.selectLeaveClass(e, date)}}
                    >
                        <span name="date">{`${dd}`}</span>
                        <span name="monthYear">{`${mm + 1}月 ${yyyy}`}</span>
                        <span name="seperator"> | </span>
                        <span name="dayTime">{`${dayOutput} ${startAt}`}</span>
                    </div>
                );
            })
        );
    }
    render() {
        return (
            <div>
                {this.options()}
                <div className="nextStepButtonsArea">
                    <Link to="/" className="cancelGray">
                        取消
                    </Link>
                </div>
            </div>
        )
    }
}

export default LeaveClassesList