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
        return (
            <div id="userPanel">
                <StepIndicator indicator={"嗨，小明"} />
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
                        to="/"
                        className="rectButton disableSelect"
                        onClick={() => {
                            this.clearSuccessMessage("RESCHEDULE");
                        }}
                    >
                        <p className="rectButton_text">資訊</p>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
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
    firestoreConnect([{ collection: "newSession" }])
)(UserPanel);
