import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// components
import TitleBlock from '../ui/titleBlock';
import Block from '../ui/block';
import NextStepButton from '../ui/nextStepButton';
import ComfyForm, { FormItemWrapper } from '../ui/comfyForm';

// contexts
import { loadingContext } from '../contexts/loadingContext';

// actions
import { signIn } from '../../actions/authActions';

class LogIn extends Component {
  state = {
    email: null,
    password: null
  };

  static contextType = loadingContext;

  loadingStart = () => {
    this.context.setLoadingBarActive(true);
  };

  loadingEnd = () => {
    this.context.setLoadingBarActive(false);
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.loadingStart();
    signIn(this.state).then(() => {
      this.props.history.push('/');
      this.loadingEnd();
    });
  };

  render() {
    return (
      <div>
        <TitleBlock title="登入" />
        <Block>
          <ComfyForm submitHandler={this.handleSubmit}>
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

export default withRouter(LogIn);
