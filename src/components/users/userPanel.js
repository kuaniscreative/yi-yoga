import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

// actions
import { signOut } from '../../actions/authActions';

class UserPanel extends Component {
    render() {

        const registerClassProcessor = this.props.newSession ? <Link to='/register-classes'>報名</Link> : null;

        return (
            <div>
                <div>歡迎xxx</div>
                <Link to="/leave-application">請假</Link>
                <Link to="/reschedule">補課</Link>
                { registerClassProcessor }
                <button onClick={this.props.signOut}>登出</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        newSession: state.firestore.ordered.newSession
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => { dispatch(signOut()) }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'newSession'}
    ])
    )(UserPanel)
