import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

// components
import AllClasses from "./allClasses";
import StepIndicator from "../stepIndicator";
import LeaveApplicationSuccess from './leaveApplication_success';

// actions
import { leaveApplication } from "../../actions/userActions";

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
        if (canApply) {
            this.props.leaveApplication(date, this.props.userId);
        } else {
            console.log("you have already leave this month");
        }
    };

    conditionalComponents = () => {
        const success = this.props.leaveApplicationSuccess;

        if (success) {
            return <LeaveApplicationSuccess />
        }  else {
            return <AllClasses submit={this.submit} />
        }
    }

    render() {
        return (
            <div id="leaveApplication">
                <StepIndicator indicator="選擇日期" />
                { this.conditionalComponents() }
                <Link to="/" onClick={this.props.clearSuccessMessage}>取消</Link>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const user = state.firestore.ordered.user
        ? state.firestore.ordered.user.find(user => {
              return user.id === state.firebase.auth.uid;
          })
        : null;

    return {
        userId: state.firebase.auth.uid,
        leaveRecord: user ? user.leaveRecord : null,
        leaveApplicationSuccess: state.user.leaveApplicationSuccess
    };
};

const mapDispatchToProps = dispatch => {
    return {
        leaveApplication: (date, userId) => {
            dispatch(leaveApplication(date, userId));
        },
        clearSuccessMessage: () => {
            dispatch({type:'CLEAR_SUCCESS_MESSAGE'})
        }
    };
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect([{ collection: "classProfile" }, { collection: "user" }])
)(LeaveApplication);
