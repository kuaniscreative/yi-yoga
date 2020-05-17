import React, { useContext } from 'react';
import styled from 'styled-components';

// components
import TitleBlock from '../ui/titleBlock';
import Block from '../ui/block';
import ListCard from './classList_listCard';
import FullWidthScrollableBlock from '../ui/fullWidthScrollableBlock';
import MonthOptions from './classList_monthOptions';
import CourseOptions from './classList_courseOptions';
import { OptionButton } from './classList_optionButton';

// contexts
import { classListContext } from '../contexts/classListContext';

// functions
import keyGen from '../../functions/keyGen';

const OptionRow = styled.div`
  margin-bottom: 1.5rem;
`;

const ClassList = () => {
  const { classes, viewAvailable, setViewAvailable } = useContext(
    classListContext
  );

  const toggleAvailable = () => {
    setViewAvailable(!viewAvailable);
  };

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
        <OptionRow>
          <OptionButton onClick={toggleAvailable} inView={viewAvailable}>
            未額滿
          </OptionButton>
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
                classId={classProfile.id}
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
