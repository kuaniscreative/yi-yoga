import React, { Component, useContext } from 'react';

// components
import DayList from './newSession_preview--dayList';
import StepIndicator from '../stepIndicator';
import NextStepButtonsArea from '../ui/nextStepButtonArea';

// contexts
import { newSessionContext } from '../contexts/newSessionContext';

const NewSessionPreview = (props) => {
  const { deleteClassWhenPreview, addSession, clearSessionInfo } = props;
  const { regularCourse, classes, toNextStep } = useContext(newSessionContext);

  // props received from newSession.js
  const classesMon = classes.filter((classInfo) => {
    return classInfo.date.getDay() === 1;
  });
  const classesTue = classes.filter((classInfo) => {
    return classInfo.date.getDay() === 2;
  });
  const classesThu = classes.filter((classInfo) => {
    return classInfo.date.getDay() === 4;
  });
  const classesFri = classes.filter((classInfo) => {
    return classInfo.date.getDay() === 5;
  });

  const dayList = (arr, day) => {
    return (
      <DayList
        classes={arr}
        deleteClassWhenPreview={deleteClassWhenPreview}
        day={day}
      />
    );
  };
  return (
    <div id="newSession_preview">
      <div className="newSession_instruction layout_contentBlock">
        <StepIndicator indicator="課程預覽" />
        <ul className="comfyList">
          <li>如果有特定日期不開放課程，可以在這裡移除</li>
        </ul>
      </div>
      {dayList(classesMon, 1)}
      {dayList(classesTue, 2)}
      {dayList(classesThu, 4)}
      {dayList(classesFri, 5)}
      <NextStepButtonsArea
        actionName="報名開放"
        action={() => {
          toNextStep();
          addSession();
        }}
        cancelName="上一步"
        cancel={clearSessionInfo}
      />
    </div>
  );
};

export default NewSessionPreview;
