import React, { Component } from "react";
import { Link } from "react-router-dom";

class Register extends Component {
    state = {
        email: '',
        password: '',
        name: '',
        nickName: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('registering Account and password');
    }

    handleChange = (e) => {
        console.log(e.target.name, e.target.value)
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

export default Register;
