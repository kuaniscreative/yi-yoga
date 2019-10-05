import React, { Component } from "react";
import { Link } from 'react-router-dom';

class UserPanel extends Component {
    render() {
        return (
            <div>
                <div>歡迎xxx</div>
                <Link to="/leave-application">請假</Link>
                <Link to="/reschedule">補課</Link>
                <button>登出</button>
            </div>
        );
    }
}

export default UserPanel
