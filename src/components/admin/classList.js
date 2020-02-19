import React, { useContext } from 'react';
import styled from 'styled-components';

// components
import TitleBlock from '../ui/titleBlock';
import Block from '../ui/block';
import ButtonGroup from '../ui/buttonGroup';

// contexts
import { regularCourseContext } from '../contexts/regularCourseContext';

const ClassList = () => {
  const { regularCourse } = useContext(regularCourseContext);
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
      <Block>
        <button className="outlineButton">一月</button>
        <button className="outlineButton">二月</button>
      </Block>
    </div>
  );
};

export default ClassList;
