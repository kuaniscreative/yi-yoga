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
import { leaveApplication, updateLeaveRecord } from "../../actions/userActions";

class LeaveApplication extends Component {
    checkLeaveRecord = date => {
        const checker = `${date.getFullYear()}/${date.getMonth() + 1}`;
        if (
            this.props.leaveRecord &&
            this.props.leaveRecord.indexOf(checker) > -1
        ) {
            return false;
        }
        return true;
    };

    submit = date => {
        const canApply = this.checkLeaveRecord(date.toDate());
        this.props.updateLeaveRecord(date, this.props.userId);
        // if (canApply) {
        //     this.props.leaveApplication(date, this.props.userId);
        // } else {
        //     console.log("you have already leave this month");
        // }
    };

    conditionalComponents = () => {
        const success = this.props.leaveApplicationSuccess;

        if (success) {
            return <LeaveApplicationSuccess />;
        } else {
            return <ClassList submit={this.submit} classes={this.props.userClasses} />;
        }
    };

    render() {
        return (
            <div id="leaveApplication">
                <StepIndicator indicator="選擇日期" />
                {this.conditionalComponents()}
                <Link to="/" onClick={this.props.clearSuccessMessage}>
                    取消
                </Link>
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
            dispatch(updateLeaveRecord(date, userId));
        },
        clearSuccessMessage: () => {
            dispatch({ type: "CLEAR_SUCCESS_MESSAGE" });
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
