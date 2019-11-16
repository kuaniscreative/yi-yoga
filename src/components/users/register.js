import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

// components
import StepIndicator from '../stepIndicator';
import NextStepButtonsArea from '../ui/nextStepButtonArea';

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
        if (this.props.uid) return <Redirect to='/'/>
        return (
            <div>
                <StepIndicator indicator='註冊帳號'/>
                <form className='comfyForm innerContent' onSubmit={this.handleSubmit}>
                    <label>帳號</label>
                    <input name='email' type="text" onChange={this.handleChange} placeholder="請輸入信箱"/>
                    <label>密碼</label>
                    <input name='password' type="password" onChange={this.handleChange} placeholder="至少6位數之密碼"/>
                    <label>姓名</label>
                    <input name='name' type="text" onChange={this.handleChange} placeholder="你的名字"/>
                    <label>暱稱</label>
                    <input name='nickName' type="text" onChange={this.handleChange} placeholder="a.k.a"/>
                    <NextStepButtonsArea />
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        uid: state.firebase.auth.uid
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (userInfo) => { 
            dispatch({type: 'LOADING'});
            dispatch(signUp(userInfo)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
