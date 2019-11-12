import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import UserPanel from './users/userPanel';
import GuestPanel from './guestPanel';

class Main extends Component {

    render() {
        return (
            this.props.user.uid ? <UserPanel /> : <GuestPanel />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Main)