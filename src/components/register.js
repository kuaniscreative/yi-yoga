import React, { Component } from "react";
import { Link } from "react-router-dom";

class Register extends Component {
    handleSubmit = () => {
        console.log('registering Account and password');
    }
    render() {
        return (
            <div>
                申請
                <form>
                    <label>帳號</label>
                    <input type="text" />
                    <label>密碼</label>
                    <input type="text" />
                    <a href="#" onClick={this.handleSubmit}>
                        送出
                    </a>
                </form>
                <Link to="/">取消</Link>
            </div>
        );
    }
}

export default Register;
