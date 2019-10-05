import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// actions
import { signIn } from '../actions/auth';

class LogIn extends Component {

    state = {
        email: null,
        password: null
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state)
    }

    render() {
        console.log(this.props);
        return (
            <div>
                登入
                <form onSubmit={this.handleSubmit}>
                    <label>帳號</label>
                    <input name='email' type="text" onChange={this.handleChange} />
                    <label>密碼</label>
                    <input name='password' type="password" onChange={this.handleChange} />
                    <button>送出</button>
                </form>
                <Link to='/'>取消</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        test: state.firebase
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (cred) => {
            dispatch(signIn(cred))
        } 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)