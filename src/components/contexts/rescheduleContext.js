import React, { createContext, useState, useContext, useMemo } from 'react';

// contexts
import { allClassContext } from './allClassContext';

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

  /** find available classes */
  const { classes } = useContext(allClassContext);
  const availableClasses = useMemo(() => {
    if (classes.length && leaveClass) {
      const leaveClassMonth = leaveClass.getMonth();
      const leaveClassYear = leaveClass.getFullYear();
      const nextMonthDate = new Date(leaveClassYear, leaveClassMonth + 1);
      const nextMonth = nextMonthDate.getMonth();
      const availableOptions = classes.filter((classInfo) => {
        const currentMonth = classInfo.date.getMonth();
        return currentMonth === leaveClassMonth || currentMonth === nextMonth;
      });
      return availableOptions;
    }
    return [];
  }, [classes, leaveClass]);

  /** reschedule class selection  */
  const [rescheduleTarget, setRescheduleTarget] = useState(null);

  return (
    <rescheduleContext.Provider
      value={{
        leaveClass,
        setLeaveClass,
        toNextStep,
        toPrevStep,
        step,
        availableClasses,
        rescheduleTarget,
        setRescheduleTarget
      }}
    >
      {children}
    </rescheduleContext.Provider>
  );
}

export default RescheduleContextProvider;
