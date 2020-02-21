import React, { createContext, useContext, useState } from 'react';

// contexts
import { regularCourseContext } from './regularCourseContext';
import { allClassContext } from './allClassContext';

// functions
import {
  reconstruct,
  getCourseOption,
  rule
} from '../../functions/classListHelpers';

export const classListContext = createContext();

const ClassListContextProvider = (props) => {
  const { regularCourse } = useContext(regularCourseContext);
  const { classes } = useContext(allClassContext);
  const { monthOptions, sortedByMonth } = reconstruct(classes);
  const courseOptions = getCourseOption(regularCourse);
  const [monthIndex, setMonthIndex] = useState(0);
  const [courseInView, setCourseInView] = useState(null);
  const [viewAvailable, setViewAvailable] = useState(false);
  const monthInView = monthOptions[monthIndex]; // this is a number
  const monthInViewAsString = parseInt(monthInView, 10);
  const classesInView = sortedByMonth[monthInViewAsString] || [];

  const matchPattern = {
    dayString: courseInView,
    isFull: viewAvailable ? null : false
  };

  const matchPatternClasses = classesInView.filter(rule, matchPattern);

  return (
    <classListContext.Provider
      value={{
        classes: matchPatternClasses,
        monthOptions,
        monthInView,
        monthIndex,
        monthInViewAsString,
        setMonthIndex,
        courseOptions,
        courseInView,
        setCourseInView,
        setViewAvailable
      }}
    >
      {props.children}
    </classListContext.Provider>
  );
};

export default ClassListContextProvider;
