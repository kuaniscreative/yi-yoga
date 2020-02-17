import React, { createContext, useState, useEffect, useContext } from 'react';

// contexts
import { regularCourseContext } from './regularCourseContext';

// functions
import { getSession } from '../../functions/getSession';

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
  const [classes, setClasses] = useState([]);
  const { regularCourse } = useContext(regularCourseContext);

  const toNextStep = () => {
    const fsm = {
      initial: 'setter',
      setter: 'preview',
      preview: 'success',
      success: 'initial'
    };
    setStep(fsm[step]);
  };

  /**
   *  get Classes
   */
  useEffect(() => {
    const { start, end } = sessionSpan;
    const startDate = new Date(start.year, start.month - 1, 1);
    const endDate = new Date(end.year, end.month, 0);
    const matchClasses = getSession(startDate, endDate, regularCourse);

    setClasses(matchClasses);
  }, [sessionSpan]);

  return (
    <newSessionContext.Provider
      value={{ step, toNextStep, sessionSpan, setSessionSpan, classes }}
    >
      {props.children}
    </newSessionContext.Provider>
  );
};

export default NewSessionContext;
