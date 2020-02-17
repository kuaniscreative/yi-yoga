import React, { createContext, useState } from 'react';

export const newSessionContext = createContext();

const initSpan = {
  start: {
    month: null,
    year: null
  },
  end: {
    month: null,
    year: null
  }
};

const NewSessionContext = (props) => {
  const [step, setStep] = useState('setter');
  const [sessionSpan, setSessionSpan] = useState(initSpan);

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
    <newSessionContext.Provider
      value={{ step, toNextStep, sessionSpan, setSessionSpan }}
    >
      {props.children}
    </newSessionContext.Provider>
  );
};

export default NewSessionContext;
