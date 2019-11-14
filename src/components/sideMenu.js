import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class SideMenu extends Component {

    clearSuccessMessage = (target = "") => {
        const output = `CLEAR_SUCCESS_MESSAGE_${target}`;
        this.props.clearSuccessMessage(output);
    };

    handleClick = (target = '') => {
        const sideMenu = document.getElementById('sideMenu');
        sideMenu.classList.remove('active');

        if (target.length) {
            this.clearSuccessMessage(target)
        }
        
    }

    render() {
        return (
            <div id="sideMenu">
                <div id="sideMenu_users">
                    <Link
                        to="/leave-application"
                        className=""
                        onClick={() => {
                            this.handleClick("LEAVE");
                        }}
                    >
                        <p className="rectButton_text">請假</p>
                    </Link>

                    <Link
                        to="/reschedule"
                        className=""
                        onClick={() => {
                            this.handleClick("RESCHEDULE");
                        }}
                    >
                        <p className="rectButton_text">補課</p>
                    </Link>
                    <Link
                        to={this.props.newSession ? "/register-classes" : "/"}
                        className=''
                        onClick={() => {
                            this.handleClick("NEWSESSION");
                        }}
                    >
                        <p className="rectButton_text">報名</p>
                    </Link>
                    <Link to="/info" className="" onClick={() => {
                            this.handleClick("NEWSESSION");
                        }}>
                        <p className="rectButton_text">使用者及課堂資訊</p>
                    </Link>
                </div>
                <div id="sideMenu_infos"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
