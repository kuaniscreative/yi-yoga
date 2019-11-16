import React from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

// actions
import { signOut } from '../../actions/authActions';

const UserAccount = ({signOut, uid}) => {
    if (!uid) {
        return <Redirect to='/' />
    }
    return (
        <div>
            <button onClick={signOut}>登出</button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        uid: state.firebase.auth.uid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => {
            dispatch(signOut());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserAccount);
