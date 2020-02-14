import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

// contexts
import { userContext } from '../contexts/userContext';
import { signUpContext } from '../contexts/signUpContext';

const SignUp = () => {
  const { id } = useContext(userContext);
  const { signUpSuccess } = useContext(signUpContext);

  if (id && signUpSuccess) return <Redirect to="/" />;
  return <div id="signUp">{signUpSuccess ? null : null}</div>;
};

export default SignUp;
