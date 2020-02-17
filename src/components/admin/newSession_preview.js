import React, { useContext } from 'react';

// components
import DayList from './newSession_preview--dayList';
import StepIndicator from '../stepIndicator';
import NextStepButtonsArea from '../ui/nextStepButtonArea';
import Block from '../ui/block';
import Subtitle from '../ui/subtitle';
import ClassWrapper from './newSession_classWrapper';

// contexts
import { newSessionContext } from '../contexts/newSessionContext';

// functions
import keyGen from '../../functions/keyGen';

const Preview = (props) => {
  const { deleteClassWhenPreview, addSession, clearSessionInfo } = props;
  const { regularCourse, classes, toNextStep } = useContext(newSessionContext);

  // props received from newSession.js
  //   const classesMon = classes.filter((classInfo) => {
  //     return classInfo.date.getDay() === 1;
  //   });
  //   const classesTue = classes.filter((classInfo) => {
  //     return classInfo.date.getDay() === 2;
  //   });
  //   const classesThu = classes.filter((classInfo) => {
  //     return classInfo.date.getDay() === 4;
  //   });
  //   const classesFri = classes.filter((classInfo) => {
  //     return classInfo.date.getDay() === 5;
  //   });

  //   const dayList = (arr, day) => {
  //     return (
  //       <DayList
  //         classes={arr}
  //         deleteClassWhenPreview={deleteClassWhenPreview}
  //         day={day}
  //       />
  //     );
  //   };
  return (
    <Block id="newSession_preview">
      <Subtitle title="課程預覽">
        如果有特定日期不開放課程，可以在這裡移除。
      </Subtitle>
      <div className="container-fluid px-0">
        <div className="row">
          {regularCourse.map((courseInfo) => {
            return (
              <div className="col-12 col-md-6 col-lg-4" key={keyGen()}>
                <ClassWrapper courseInfo={courseInfo} classes={classes} />
              </div>
            );
          })}
        </div>
      </div>

      {/* {dayList(classesMon, 1)}
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
      /> */}
    </Block>
  );
};

export default Preview;
