import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from '../../fbConfig';

// components
import NextStepButtonsArea from '../ui/nextStepButtonArea';

// actions
import { signUp } from '../../actions/authActions';

//settings
const sendNewUserNotification = firebase
  .functions()
  .httpsCallable('sendNewUserNotification');

class SignUpForm extends Component {
  state = {
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    nickName: '',
    message: ''
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const password = this.state.password;
    const passwordConfirm = this.state.passwordConfirm;

    if (password !== passwordConfirm) {
      alert('密碼確認欄輸入錯誤');
    } else {
      this.props.loading();
      signUp(this.state).then(() => {
        this.props.loaded();
        this.props.history.push('/signUpSuccess');
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div>
        <div className="layout_pageTitle">
          <div className="wrapper">
            <h1>註冊</h1>
          </div>
        </div>
        <div className="layout_contentBlock">
          <form className="comfyForm innerContent" onSubmit={this.handleSubmit}>
            <label>帳號</label>
            <input
              name="email"
              type="text"
              onChange={this.handleChange}
              placeholder="請輸入信箱"
            />
            <label>密碼</label>
            <input
              name="password"
              type="password"
              onChange={this.handleChange}
              placeholder="至少6位數之密碼"
            />
            <label>確認密碼</label>
            <input
              name="passwordConfirm"
              type="password"
              onChange={this.handleChange}
              placeholder="再次輸入密碼"
            />
            <label>姓名</label>
            <input
              name="name"
              type="text"
              onChange={this.handleChange}
              placeholder="你的名字"
            />
            <label>暱稱</label>
            <input
              name="nickName"
              type="text"
              onChange={this.handleChange}
              placeholder="a.k.a"
            />
            <label>訊息</label>
            <textarea
              name="message"
              cols="30"
              rows="10"
              onChange={this.handleChange}
              placeholder="請輸入訊息，讓芝伊認識你"
            ></textarea>
            <NextStepButtonsArea
              cancel={(e) => {
                e.preventDefault();
                this.props.history.goBack();
              }}
            />
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loading: () => {
      dispatch({ type: 'LOADING' });
    },
    loaded: () => {
      dispatch({ type: 'LOADED' });
    }
  };
};

export default withRouter(connect(null, mapDispatchToProps)(SignUpForm));
