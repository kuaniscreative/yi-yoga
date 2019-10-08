import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

// actions
import { signUp } from '../../actions/authActions';

class Register extends Component {
    state = {
        email: '',
        password: '',
        name: '',
        nickName: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                申請
                <form onSubmit={this.handleSubmit}>
                    <label>帳號</label>
                    <input name='email' type="text" onChange={this.handleChange} />
                    <label>密碼</label>
                    <input name='password' type="password" onChange={this.handleChange} />
                    <label>姓名</label>
                    <input name='name' type="text" onChange={this.handleChange} />
                    <label>暱稱</label>
                    <input name='nickName' type="text" onChange={this.handleChange} />
                    <button>確認</button>
                </form>
                <Link to="/">取消</Link>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (userInfo) => { dispatch(signUp(userInfo)) }
    }
}

export default connect(null, mapDispatchToProps)(Register);
