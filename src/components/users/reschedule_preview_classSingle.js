import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class ClassSingle extends Component {
    handleChange = e => {
        this.props.select(e.target.value);
    };

    render() {
        const classInfo = this.props.classSingle;
        const classId = classInfo.id;
        const date = classInfo.classDate.toDate();
        const dd = date.getDate();
        const mm = date.getMonth();
        const yyyy = date.getFullYear();
        const hr = date.getHours();
        const min = date.getMinutes();
        const startAt = `${hr}:${min}`;
        const day = date.getDay();
        const dayOutput = `週${day.toLocaleString("zh-u-nu-hanidec")}`;
        let pendingNum;
        let availableNum;
        if (classInfo) {
            pendingNum = classInfo.pendingStudents ? classInfo.pendingStudents.length : 0;
            availableNum = classInfo.students ? classInfo.capacity - classInfo.students.length - classInfo.rescheduleStudents.length : 0;
        }

        return (
            <label className="checkboxContainer">
                <div className="dateHero checkboxContainer_message">
                    <span name="date">{`${dd}`}</span>
                    <span name="monthYear">{`${mm + 1}月 ${yyyy}`}</span>
                    <span name="seperator"> | </span>
                    <span name="dayTime">{`${dayOutput} ${startAt}`}</span>
                    <div className="dateHero_message">
                        <span>{`空位： ${availableNum}`}</span>
                        <span name='seperator'> | </span>
                        <span>{`等待人數： ${pendingNum}`}</span>
                    </div>
                </div>
                <div className="checkboxContainer_checkbox">
                    <input
                        type="radio"
                        name="rescheduleDate"
                        value={classId}
                        onChange={this.handleChange}
                    />
                    <span className="checkmark"></span>
                </div>
            </label>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.firebase.auth.uid,
        stamp: state.user.selectedRecheduleStamp
    };
};

export default compose(
    connect(
        mapStateToProps
    ),
    firestoreConnect([{ collection: "classProfile" }])
)(ClassSingle);
