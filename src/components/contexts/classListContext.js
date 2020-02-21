import React, { createContext, useContext, useState } from 'react';

// contexts
import { regularCourseContext } from './regularCourseContext';
import { allClassContext } from './allClassContext';

// functions
import { reconstruct, getCourseOption } from '../../functions/classListHelpers';

export const classListContext = createContext();

const ClassListContextProvider = (props) => {
  const { regularCourse } = useContext(regularCourseContext);
  const { classes } = useContext(allClassContext);
  const { monthOptions, sortedByMonth } = reconstruct(classes);
  const courseOptions = getCourseOption(regularCourse);
  const [monthIndex, setMonthIndex] = useState(0);
  const monthInView = monthOptions[monthIndex]; // this is a number
  const monthInViewAsString = parseInt(monthInView, 10);

  return (
    <classListContext.Provider
      value={{
        classes,
        monthOptions,
        monthInView,
        monthIndex,
        monthInViewAsString,
        setMonthIndex,
        courseOptions
      }}
    >
      {props.children}
    </classListContext.Provider>
  );
};

export default ClassListContextProvider;
