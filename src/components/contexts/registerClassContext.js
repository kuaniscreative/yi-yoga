import React, { createContext, useState, useContext, useEffect } from 'react';

// contexts
import { openingSessionContext } from './openingSessionContext';
import { allClassContext } from './allClassContext';
import { userContext } from './userContext';

// functions
import {
  markSelectionOnClasses,
  hasStudent
} from '../../functions/registerClassHelpers';

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
  const { uid } = useContext(userContext);
  const [targetClasses, setTargetClasses] = useState([]);
  useEffect(() => {
    if (uid && classes.length && session.hasOwnProperty('id')) {
      const targetClasses = classes
        .filter((classInfo) => {
          return classInfo.session === session.id;
        })
        .map((classInfo) => {
          const userRegistered =
            hasStudent(classInfo.students, uid) ||
            hasStudent(classInfo.rescheduleStudents, uid);
          return {
            ...classInfo,
            userRegistered
          };
        });
      setTargetClasses(targetClasses);
    }
  }, [classes, session, uid]);

  /**
   * user selection
   */
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [markedClasses, setMarkedClasses] = useState([]);
  useEffect(() => {
    const newClasses = markSelectionOnClasses(selectedClasses, targetClasses);
    setMarkedClasses(newClasses);
  }, [selectedClasses, targetClasses]);

  return (
    <registerClassContext.Provider
      value={{
        step,
        toNextStep,
        toPrevStep,
        classes: markedClasses,
        selectedClasses,
        setSelectedClasses
      }}
    >
      {props.children}
    </registerClassContext.Provider>
  );
};

export default RegisterClassContextProvider;
