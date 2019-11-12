import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class UserPanel extends Component {
    clearSuccessMessage = (target = "") => {
        const output = `CLEAR_SUCCESS_MESSAGE_${target}`;
        this.props.clearSuccessMessage(output);
    };

    registerClassProcessor = () => {
        return this.props.newSession ? (
            <Link
                to="/register-classes"
                className="outlineButton"
                onClick={() => {
                    this.clearSuccessMessage("NEWSESSION");
                }}
            >
                報名
            </Link>
        ) : null;
    };

    render() {
        return (
            <div id="userPanel">
                <div className="welcomeMessage">嗨，小明</div>
                <div className="userPanel_actions">
                    <Link
                        to="/leave-application"
                        className="outlineButton"
                        onClick={() => {
                            this.clearSuccessMessage("LEAVE");
                        }}
                    >
                        請假
                    </Link>
                    <Link
                        to="/reschedule"
                        className="outlineButton"
                        onClick={() => {
                            this.clearSuccessMessage("RESCHEDULE");
                        }}
                    >
                        補課
                    </Link>
                    {this.registerClassProcessor()}
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
