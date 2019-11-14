import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class SideMenu extends Component {

    clearSuccessMessage = (target = "") => {
        const output = `CLEAR_SUCCESS_MESSAGE_${target}`;
        this.props.clearSuccessMessage(output);
    };
    
    render() {
        return (
            <div id="sideMenu">
                <div id="sideMenu_users">
                    <Link
                        to="/leave-application"
                        className=""
                        onClick={() => {
                            this.clearSuccessMessage("LEAVE");
                        }}
                    >
                        <p className="rectButton_text">請假</p>
                    </Link>

                    <Link
                        to="/reschedule"
                        className=""
                        onClick={() => {
                            this.clearSuccessMessage("RESCHEDULE");
                        }}
                    >
                        <p className="rectButton_text">補課</p>
                    </Link>
                    <Link
                        to={this.props.newSession ? "/register-classes" : "/"}
                        className=''
                        onClick={() => {
                            this.clearSuccessMessage("NEWSESSION");
                        }}
                    >
                        <p className="rectButton_text">報名</p>
                    </Link>
                    <Link to="/info" className="">
                        <p className="rectButton_text">使用者及課堂資訊</p>
                    </Link>
                </div>
                <div id="sideMenu_infos"></div>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        clearSuccessMessage: dispatchType => {
            dispatch({ type: dispatchType });
        }
    };
};

export default connect(null, mapDispatchToProps)(SideMenu);
