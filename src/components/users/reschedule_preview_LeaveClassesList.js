import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// conponents
import DateSingle from '../ui/dateSingle';

class LeaveClassesList extends Component {

    options = () => {
        const leaveRecord = this.props.leaveRecord;
        return (
            leaveRecord &&
            leaveRecord.reschedulable.map((timestamp, i) => {
                const date = timestamp.toDate();
                const yyyy = date.getFullYear();
                const mm = date.getMonth();
                return (
                    <div
                        className="shadowOption  checkboxContainer_message"
                        key={i}
                        data-month={mm}
                        data-year={yyyy}
                        onClick={() => {this.props.selectLeaveClass(mm, yyyy, date)}}
                    >
                       <DateSingle date={date}/>
                    </div>
                );
            })
        );
    }
    render() {
        return (
            <div className='nextStepButtonsArea_parent'>
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