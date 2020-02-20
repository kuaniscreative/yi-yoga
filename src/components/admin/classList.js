import React, { useContext } from 'react';
import styled from 'styled-components';

// components
import TitleBlock from '../ui/titleBlock';
import Block from '../ui/block';
import ButtonGroup from '../ui/buttonGroup';

// contexts
import { regularCourseContext } from '../contexts/regularCourseContext';
import { allClassContext } from '../contexts/allClassContext';

const reconstruct = (classes) => {
  const monthOptions = [];
  const sortedByMonth = {};

  if (classes.length === 0) {
    return {
      monthOptions,
      sortedByMonth
    };
  }

  classes.forEach((classInfo) => {
    const date = classInfo.date;
    const classMonth = date.getMonth();
    if (monthOptions.indexOf(classMonth) < 0) {
      monthOptions.push(classMonth);
      sortedByMonth[classMonth] = [];
    }
    sortedByMonth[classMonth].push(classInfo);
  });

  return {
    monthOptions,
    sortedByMonth
  };
};

const ClassList = () => {
  const { regularCourse } = useContext(regularCourseContext);
  const { classes } = useContext(allClassContext);
  const { monthOptions, sortedByMonth } = reconstruct(classes);
  const courseOptions = regularCourse.reduce((acc, cVal) => {
    const day = cVal.day;
    if (acc.indexOf(day) < 0) {
      return [...acc, day];
    }
  }, []);

  return (
    <div>
      <TitleBlock title="查看課表" />
      <Block>
        <ButtonGroup>
          <button>所有課堂</button>
          <button>未額滿</button>
        </ButtonGroup>
      </Block>
      <Block></Block>
    </div>
  );
};

export default ClassList;
