import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

// components
import TitleBlock from '../ui/titleBlock';
import Block from '../ui/block';
import ListCard from './classList_listCard';
import FullWidthScrollableBlock from '../ui/fullWidthScrollableBlock';
import MonthOptions from './classList_monthOptions';
import CourseOptions from './classList_courseOptions';

// contexts
import { classListContext } from '../contexts/classListContext';

// functions
import keyGen from '../../functions/keyGen';

// data
import theme from '../../json/theme.json';

const OptionRow = styled.div`
  margin-bottom: 1.5rem;
`;

const ClassList = () => {
  const {
    classes,
    monthOptions,
    monthInView,
    monthIndex,
    monthInViewAsString,
    setMonthIndex,
    courseOptions,
    setCourseInView,
    setViewAvailable
  } = useContext(classListContext);

  return (
    <div>
      <TitleBlock title="查看課表" />
      <Block>
        <OptionRow>
          <MonthOptions />
        </OptionRow>
        <OptionRow>
          <CourseOptions />
        </OptionRow>
      </Block>
      <FullWidthScrollableBlock>
        {classes.map((classProfile) => {
          return (
            <div className="col-12 col-md-4 col-lg-3 mb-5" key={keyGen()}>
              <ListCard
                title={classProfile.name}
                subtitle={classProfile.type}
                students={classProfile.students}
                pendingStudents={classProfile.pendingStudents}
                rescheduleStudents={classProfile.rescheduleStudents}
              />
            </div>
          );
        })}
      </FullWidthScrollableBlock>
    </div>
  );
};

export default ClassList;
