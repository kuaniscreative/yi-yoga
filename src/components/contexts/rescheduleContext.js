import React, { createContext, useState } from 'react';

export const rescheduleContext = createContext();

const steps = {
  selectLeaveClass: 'selectRescheduleClass',
  selectRescheduleClass: 'result'
};

function RescheduleContextProvider({ children }) {
  /** steps */
  const [step, setStep] = useState('selectLeaveClass');
  const toNextStep = () => {
    setStep(steps[step]);
  };
  const toPrevStep = () => {
    const prevStep = Object.keys(steps).find((key) => {
      return steps[key] === step;
    });
    setStep(prevStep);
  };

  /** leave class selection */
  const [leaveClass, setLeaveClass] = useState(null);

  return (
    <rescheduleContext.Provider
      value={{ leaveClass, setLeaveClass, toNextStep, toPrevStep }}
    >
      {children}
    </rescheduleContext.Provider>
  );
}

export default RescheduleContextProvider;
