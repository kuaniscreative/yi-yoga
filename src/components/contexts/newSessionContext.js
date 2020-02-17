import React, { createContext, useState } from 'react';

export const newSessionContext = createContext();

const NewSessionContext = (props) => {
  const [step, setStep] = useState('setter');
  const toNextStep = () => {
    const fsm = {
      initial: 'setter',
      setter: 'preview',
      preview: 'success',
      success: 'initial'
    };
    setStep(fsm[step]);
  };
  return (
    <newSessionContext.Provider value={{ step, toNextStep }}>
      {props.children}
    </newSessionContext.Provider>
  );
};

export default NewSessionContext;
