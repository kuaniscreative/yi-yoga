import React, { Component } from "react";
import { Link } from 'react-router-dom';
class RegisterClassSuccess extends Component {
    render() {
        return (
            <div>
                <p className="resultMessage_title">報名成功</p>
                <div className="nextStepButtonsArea">
                    <Link to="/" className="outlineButton">
                        回首頁
                    </Link>
                </div>
            </div>
        );
    }
}

export default RegisterClassSuccess;
