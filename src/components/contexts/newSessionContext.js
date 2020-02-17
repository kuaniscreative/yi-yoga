import React, { createContext, useState } from 'react';

const newSessionContext = createContext();

const NewSessionContext = (props) => {
  const [step, setStep] = useState('period');
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
    <newSessionContext.Provider value={{ toNextStep }}>
      {props.children}
    </newSessionContext.Provider>
  );
};

export default NewSessionContext;
