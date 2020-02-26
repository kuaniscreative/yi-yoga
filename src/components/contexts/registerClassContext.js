import React, { createContext, useState, useContext } from 'react';

// contexts
import { openingSessionContext } from './openingSessionContext';
import { allClassContext } from './allClassContext';

// functions
import { reconstruct } from '../../functions/registerClassHelpers';

export const registerClassContext = createContext();

const RegisterClassContextProvider = (props) => {
  /**
   *  Setting Steps
   */
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

  /**
   *  Reconstruct data from contexts
   */
  const { classes } = useContext(allClassContext);
  const { session } = useContext(openingSessionContext);
  const targetClasses = classes.filter((classInfo) => {
    return classInfo.session === session.id;
  });

  return (
    <registerClassContext.Provider
      value={{ step, toNextStep, toPrevStep, classes: targetClasses }}
    >
      {props.children}
    </registerClassContext.Provider>
  );
};

export default RegisterClassContextProvider;
