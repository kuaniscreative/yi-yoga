import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// actions
import { signOut } from '../../actions/authActions';

class UserPanel extends Component {
    render() {
        return (
            <div>
                <div>歡迎xxx</div>
                <Link to="/leave-application">請假</Link>
                <Link to="/reschedule">補課</Link>
                <button onClick={this.props.signOut}>登出</button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => { dispatch(signOut()) }
    }
}

export default connect(null, mapDispatchToProps)(UserPanel)
