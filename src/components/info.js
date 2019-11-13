import React from "react";
import { connect } from "react-redux";

// actions
import { signOut } from '../actions/authActions';

const Info = ({signOut}) => {
    return (
        <div>
            <button onClick={signOut}>登出</button>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => {
            dispatch(signOut());
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Info);
