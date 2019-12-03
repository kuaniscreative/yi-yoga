import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

// components
import ItemBarWithAction from "../ui/itemBarWithAction";

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
        let pendingNum;
        let availableNum;
        if (classInfo) {
            pendingNum = classInfo.pendingStudents
                ? classInfo.pendingStudents.length
                : 0;
            availableNum = classInfo.students
                ? classInfo.capacity -
                  classInfo.students.length -
                  classInfo.rescheduleStudents.length
                : 0;
        }

        return (
            <label className="checkboxContainer reschedule_preview_options">
                <ItemBarWithAction
                    message={
                        <div>
                            <div className="date">
                                <span>{`${yyyy}年${mm + 1}月${dd}日`}</span>
                                <span>{`${startAt}`}</span>
                            </div>
                            <div className="message">
                                <span>{`空位： ${availableNum}`}</span>
                                <span name="seperator"> | </span>
                                <span>{`等待人數： ${pendingNum}`}</span>
                            </div>
                        </div>
                    }
                    action={
                        <div className="checkboxContainer_checkbox">
                            <input
                                type="radio"
                                name="rescheduleDate"
                                value={classId}
                                onChange={this.handleChange}
                            />
                            <span className="checkmark"></span>
                        </div>
                    }
                />
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
    connect(mapStateToProps),
    firestoreConnect([{ collection: "classProfile" }])
)(ClassSingle);
