import React, { useContext } from 'react';

// components
import { OptionButton } from './classList_optionButton';

// contexts
import { classListContext } from '../contexts/classListContext';

// functions
import keyGen from '../../functions/keyGen';

const CourseOptions = () => {
  const { courseInView, courseOptions, setCourseInView } = useContext(
    classListContext
  );

  const viewThisCourse = (courseName) => {
    setCourseInView(courseName);
  };

  const resetViewingCourse = () => {
    setCourseInView(null);
  };

  return (
    <div>
      {courseOptions.map((item, i) => {
        const inView = item === courseInView;
        const handleClick = inView
          ? resetViewingCourse
          : () => {
              viewThisCourse(item);
            };
        return (
          <OptionButton key={keyGen()} inView={inView} onClick={handleClick}>
            {item}
          </OptionButton>
        );
      })}
    </div>
  );
};

export default CourseOptions;
