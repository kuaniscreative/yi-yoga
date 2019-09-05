import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Main extends Component {
    state = {
        loggedIn: true
    }
    guestPanel = (
        <div>
            <p>最強瑜伽沒有之一</p>
            <Link to='/log-in'>登入</Link>
            <Link to='/register'>註冊</Link>
        </div>
    )
    userPanel = (
        <div>
            <div>歡迎xxx</div>
            <Link to='/leave-application'>請假</Link>
            <Link to='/reschedule'>補課</Link>
        </div>
    )
    render() {
        return (
            this.state.loggedIn ? this.userPanel : this.guestPanel
        )
    }
}

export default Main