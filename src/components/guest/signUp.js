import React from 'react';

// components
import SignUpForm from './signUpForm';
import TitleBlock from '../ui/titleBlock';
import Block from '../ui/block';

const SignUp = () => {
  return (
    <div id="signUp">
      <TitleBlock title="註冊帳號" />
      <Block>
        <SignUpForm />
      </Block>
    </div>
  );
};

export default SignUp;
