import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

// components
import TitleBlock from '../ui/titleBlock';
import Block from '../ui/block';
import ListCard from './classList_listCard';
import FullWidthScrollableBlock from '../ui/fullWidthScrollableBlock';

// contexts
import { classListContext } from '../contexts/classListContext';

// functions
import keyGen from '../../functions/keyGen';

// data
import theme from '../../json/theme.json';

const OptionButton = styled.button`
  margin-right: 12px;
  background: ${(props) => (props.inView ? theme.colors.gray6 : 'none')};
  color: ${(props) => (props.inView ? 'white' : theme.colors.gray6)};
`;

const OptionRow = styled.div`
  margin-bottom: 1rem;
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

  const selectMonth = (e) => {
    const index = e.target.dataset.index;
    const i = parseInt(index, 10);
    setMonthIndex(i);
  };

  return (
    <div>
      <TitleBlock title="查看課表" />
      <Block>
        <OptionRow>
          {monthOptions.map((item, i) => {
            const inView = i === monthIndex;
            return (
              <OptionButton
                className="outlineButton"
                key={keyGen()}
                inView={inView}
                data-index={i}
                onClick={selectMonth}
              >
                {`${item.toLocaleString('zh')}月`}
              </OptionButton>
            );
          })}
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
