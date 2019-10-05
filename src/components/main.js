import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import UserPanel from './users/userPanel';

class Main extends Component {
    state = {
        loggedIn: false
    }

    guestPanel = (
        <div>
            <p>最強瑜伽沒有之一</p>
            <Link to='/log-in'>登入</Link>
            <Link to='/register'>註冊</Link>
        </div>
    )

    render() {
        return (
            this.props.user ? <UserPanel /> : this.guestPanel
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        user: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Main)