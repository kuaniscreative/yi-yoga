import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

// components
import ClassList from "./leaveApplication_classList";
import StepIndicator from "../stepIndicator";
import LeaveApplicationSuccess from "./leaveApplication_success";

// actions
import { leaveApplication, updateLeaveRecord_leave } from "../../actions/userActions";

class LeaveApplication extends Component {
    checkLeaveRecord = date => {
        const checker = `${date.getFullYear()}/${date.getMonth() + 1}`;
        if (
            this.props.leaveRecord &&
            this.props.leaveRecord.stamps.indexOf(checker) > -1
        ) {
            return false;
        }
        return true;
    };

    submit = date => {
        const canApply = this.checkLeaveRecord(date.toDate());
        if (canApply) {
            this.props.leaveApplication(date, this.props.userId);
            this.props.updateLeaveRecord(date.toDate(), this.props.userId);
        } else {
            console.log("you have already leave this month");
        }
    };

    conditionalComponents = () => {
        const success = this.props.leaveApplicationSuccess;
        const classifyClassesByLeaveRecord = this.props.userClasses && this.props.userClasses.map((timestamp) => {
            const date = timestamp.toDate();
            const mm = date.getMonth();
            const yyyy = date.getFullYear();
            const leaveRecord = this.props.leaveRecord ? this.props.leaveRecord.stamps : null;
            let canApply = true;
            leaveRecord && leaveRecord.forEach((record) => {
                const recordMonth = parseInt(record.split('/')[1], 10) - 1;
                const recordYear = parseInt(record.split('/')[0], 10);
                if (recordMonth === mm && recordYear === yyyy) {
                    canApply = false;
                } 
            })

            return {
                date: timestamp,
                canApply
            }
        })

        if (success) {
            return <LeaveApplicationSuccess />;
        } else {
            return <ClassList submit={this.submit} classes={classifyClassesByLeaveRecord} />;
        }
    };

    indicatorOutput = () => {
        const success = this.props.leaveApplicationSuccess;
        if (success) {
            return '請假結果'
        } else {
            return '選擇請假日期'
        }
    }

    render() {
        return (
            <div id="leaveApplication">
                <StepIndicator indicator={this.indicatorOutput()} />
                {this.conditionalComponents()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const leaveRecord = state.firestore.ordered.leaveRecord;
    const userId = state.firebase.auth.uid;
    const userData = state.firestore.ordered.user
        ? state.firestore.ordered.user.find(user => {
              return user.id === state.firebase.auth.uid;
          })
        : null;
    const userRecord = leaveRecord && userId ? leaveRecord.find((record) => {
        return record.id === userId
    }) : null;

    return {
        userId: state.firebase.auth.uid,
        leaveRecord: userRecord,
        leaveApplicationSuccess: state.user.leaveApplicationSuccess,
        userClasses: userData ? userData.allClasses : null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        leaveApplication: (date, userId) => {
            dispatch(leaveApplication(date, userId));
        },
        updateLeaveRecord: (date, userId) => {
            dispatch(updateLeaveRecord_leave(date, userId));
        },
        clearSuccessMessage: () => {
            dispatch({ type: "CLEAR_SUCCESS_MESSAGE_LEAVE" });
        }
    };
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect([{ collection: "classProfile" }, { collection: "user" }, {collection: 'leaveRecord'}])
)(LeaveApplication);
