import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import TitleBlock from '../ui/titleBlock';
import Block from '../ui/block';
import NextStepButton from '../ui/nextStepButton';
import ComfyForm, { FormItemWrapper } from '../ui/comfyForm';

// actions
import { signIn } from '../../actions/authActions';

class LogIn extends Component {
  state = {
    email: null,
    password: null
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  render() {
    return (
      <div>
        <TitleBlock title="登入" />
        <Block>
          <ComfyForm onSubmit={this.handleSubmit}>
            <FormItemWrapper className="col-12">
              <label>帳號</label>
              <input
                name="email"
                type="text"
                onChange={this.handleChange}
                placeholder="請輸入你的信箱"
                required
              />
            </FormItemWrapper>
            <FormItemWrapper className="col-12">
              <label>密碼</label>
              <input
                name="password"
                type="password"
                onChange={this.handleChange}
                placeholder="請輸入你的密碼"
                required
              />
            </FormItemWrapper>
            <FormItemWrapper className="col-12">
              <NextStepButton action="確認" />
            </FormItemWrapper>
          </ComfyForm>
        </Block>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    test: state.firebase
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (cred) => {
      dispatch({ type: 'LOADING' });
      dispatch(signIn(cred));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogIn));
