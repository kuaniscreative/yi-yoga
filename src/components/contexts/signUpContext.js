import React, { createContext, useState } from 'react';

export const signUpContext = createContext();

const SignUpContext = (props) => {
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  return (
    <signUpContext.Provider value={{ signUpSuccess, setSignUpSuccess }}>
      {props.children}
    </signUpContext.Provider>
  );
};

export default SignUpContext;
