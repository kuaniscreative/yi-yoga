import React, { createContext, useState } from 'react';

export const registerClassContext = createContext();

const RegisterClassContextProvider = (props) => {
  const stepMachine = {
    initial: 'preview',
    preview: 'result',
    result: 'initial'
  };
  const [step, setStep] = useState('initial');
  const toNextStep = () => {
    setStep(stepMachine[step]);
  };
  const toPrevStep = () => {
    const prevStep = Object.keys(stepMachine).find((key) => {
      return stepMachine[key] === step;
    });
    setStep(prevStep);
  };

  return (
    <registerClassContext.Provider value={{ step, toNextStep, toPrevStep }}>
      {props.children}
    </registerClassContext.Provider>
  );
};

export default RegisterClassContextProvider;
