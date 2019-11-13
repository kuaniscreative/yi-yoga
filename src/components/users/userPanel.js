import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

// components
import StepIndicator from "../stepIndicator";

class UserPanel extends Component {
    clearSuccessMessage = (target = "") => {
        const output = `CLEAR_SUCCESS_MESSAGE_${target}`;
        this.props.clearSuccessMessage(output);
    };

    registerClassProcessor = () => {
        return this.props.newSession ? (
            <Link
                to="/register-classes"
                className="rectButton"
                onClick={() => {
                    this.clearSuccessMessage("NEWSESSION");
                }}
            >
                <p className="rectButton_text">報名</p>
            </Link>
        ) : null;
    };

    render() {
        const nickName = this.props.userData ? this.props.userData.nickName : null;
        return (
            <div id="userPanel">
                <StepIndicator indicator={`嗨，${nickName}`} />
                <div className="userPanel_infos"></div>
                <div className="userPanel_actions">
                    <Link
                        to="/leave-application"
                        className="rectButton"
                        onClick={() => {
                            this.clearSuccessMessage("LEAVE");
                        }}
                    >
                        <p className="rectButton_text">請假</p>
                    </Link>

                    <Link
                        to="/reschedule"
                        className="rectButton"
                        onClick={() => {
                            this.clearSuccessMessage("RESCHEDULE");
                        }}
                    >
                        <p className="rectButton_text">補課</p>
                    </Link>
                    <Link
                        to={this.props.newSession ? "/register-classes" : '/'}
                        className={this.props.newSession ? "rectButton" : "rectButton disableSelect"}
                        onClick={() => {
                            this.clearSuccessMessage("NEWSESSION");
                        }}
                    >
                        <p className="rectButton_text">報名</p>
                    </Link>
                    <Link
                        to="/info"
                        className="rectButton"
                    >
                        <p className="rectButton_text">使用者及課堂資訊</p>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const uid = state.firebase.auth.uid;
    const userData = state.firestore.ordered.user
        ? state.firestore.ordered.user.find(user => {
              return user.id === uid;
          })
        : null;
    return {
        userData: userData,
        newSession: state.firestore.ordered.newSession
    };
};

const mapDispatchToProps = dispatch => {
    return {
        clearSuccessMessage: dispatchType => {
            dispatch({ type: dispatchType });
        }
    };
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect([{ collection: "newSession" }, { collection: 'user'}])
)(UserPanel);
