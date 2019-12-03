import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

// components
import Preview from "./reschedule_preview";
import RescheduleSuccess from "./reschedule_success";

// actions
import { reschedulePending, rescheduleAdd } from "../../actions/userActions";

class Reschedule extends Component {
    state = {
        timeTable: [],
        selected: ""
    };

    // select the desired reschedule date
    select = classId => {
        this.setState({
            ...this.state,
            selected: classId
        });
    };

    // filter out the available classes after selectd which leaved class
    classFilter = (mm, yyyy) => {
        const selectedDate = new Date(yyyy, mm);
        const nextMonth = new Date(yyyy, mm + 1);

        return this.props.classProfile.filter(profile => {
            const month = profile.classDate.toDate().getMonth();
            const year = profile.classDate.toDate().getFullYear();
            return (
                (month === selectedDate.getMonth() &&
                    year === selectedDate.getFullYear()) ||
                (month === nextMonth.getMonth() &&
                    year === nextMonth.getFullYear())
            );
        });
    };

    // request the classes that are available for rescheduling
    requestTimeTable = (mm, yyyy) => {
        const available = this.classFilter(mm, yyyy);
        // const sorted = this.sortClassesByDay(available);
        this.setState({
            ...this.state,
            timeTable: available
        });
    };

    clearTimeTable = () => {
        this.setState({
            ...this.state,
            timeTable: []
        });
    };

    // click will fire requestTimeTable and set the leave class to state.target
    handleClick = (mm, yyyy, date) => {
        this.requestTimeTable(mm, yyyy);
        this.setState({
            target: date
        });
    };

    // controlling which component should show during different stage
    conditionalComponents = () => {
        const sortedTimeTable =
            this.state.timeTable &&
            this.state.timeTable.sort((a, b) => {
                return a.classDate.seconds - b.classDate.seconds;
            });
        if (this.props.addSuccess || this.props.pendingSuccess) {
            if (this.props.addSuccess) {
                return <RescheduleSuccess status="success" />;
            }
            return <RescheduleSuccess status="pending" />;
        } else if (
            this.props.leaveRecord &&
            this.props.leaveRecord.reschedulable.length
        ) {
            return (
                <Preview
                    classes={sortedTimeTable}
                    select={this.select}
                    submit={this.submit}
                    leaveRecord={this.props.leaveRecord}
                    classSelected={this.state.timeTable.length ? true : false}
                    selectLeaveClass={this.handleClick}
                    clearTimeTable={this.clearTimeTable}
                />
            );
        } else {
            return (
                <div className="">
                    沒有可以補課的課堂
                    <div className="nextStepButtonsArea">
                        <Link to="/" className="cancelGray">
                            回首頁
                        </Link>
                    </div>
                </div>
            );
        }
    };

    // send the data to middleware
    submit = () => {
        const classProfile = this.props.classProfile;
        const classId = this.state.selected;
        const userId = this.props.userId;
        const rescheduleDate = this.state.target;
        // check if add or pending
        const selectedClassInfo = classProfile.find(classInfo => {
            return classInfo.id === classId;
        });
        const avalible =
            selectedClassInfo.capacity -
            selectedClassInfo.students.length -
            selectedClassInfo.rescheduleStudents.length;
        if (avalible > 0) {
            this.props.rescheduleAdd(classId, userId, rescheduleDate);
        } else {
            this.props.reschedulePending(classId, userId, rescheduleDate);
        }
    };

    render() {
        return (
            <div id="reschedule">
                <div className="layout_pageTitle">
                    <div className="wrapper">
                        <h1>補課</h1>
                    </div>
                </div>

                <div className="layout_contentBlock">
                    {this.conditionalComponents()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const uid = state.firebase.auth.isempty
        ? undefined
        : state.firebase.auth.uid;
    const leaveRecord =
        uid && state.firestore.ordered.leaveRecord
            ? state.firestore.ordered.leaveRecord.find(record => {
                  return record.id === uid;
              })
            : null;
    return {
        userId: uid,
        classProfile: state.firestore.ordered.classProfile,
        leaveRecord: leaveRecord,
        addSuccess: state.user.reacheduleAddSuccess,
        pendingSuccess: state.user.reachedulePendingSuccess
    };
};

const mapDispatchToProps = dispatch => {
    return {
        reschedulePending: (classId, userId, rescheduleDate) => {
            dispatch(reschedulePending(classId, userId, rescheduleDate));
        },
        rescheduleAdd: (classId, userId, rescheduleDate) => {
            dispatch(rescheduleAdd(classId, userId, rescheduleDate));
        }
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: "user" },
        { collection: "classProfile" },
        { collection: "leaveRecord" }
    ])
)(Reschedule);
