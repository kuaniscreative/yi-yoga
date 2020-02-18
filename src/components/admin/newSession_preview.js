import React, { useContext } from 'react';

// components
import Block from '../ui/block';
import Subtitle from '../ui/subtitle';
import ClassWrapper from './newSession_classWrapper';

// contexts
import { newSessionContext } from '../contexts/newSessionContext';

// functions
import keyGen from '../../functions/keyGen';
import { addNewSession } from '../../actions/adminActions';

const getMonths = (startMonth, endMonth) => {
  const total = [];
  while (endMonth >= startMonth) {
    total.push(startMonth % 12);
    startMonth = (startMonth + 1) % 12;
  }
  return total;
};
const Preview = (props) => {
  const { sessionSpan, classes, setClasses, toNextStep } = useContext(
    newSessionContext
  );

  const totalMonths = getMonths(sessionSpan.start.month, sessionSpan.end.month);

  const removeClass = (id) => {
    const newClasses = classes.filter((classInfo) => {
      return classInfo.id !== id;
    });

    setClasses(newClasses);
  };

  const handleClick = () => {
    addNewSession(sessionSpan, classes).then(() => {
      toNextStep();
    });
  };

  return (
    <Block id="newSession_preview">
      <Subtitle title="課程預覽">
        如果有特定日期不開放課程，可以在這裡移除。
      </Subtitle>
      <div className="container-fluid px-0">
        <div className="row">
          {totalMonths.map((month) => {
            const matchClasses = classes.filter((classInfo) => {
              return classInfo.date.getMonth() + 1 === month;
            });
            return (
              <div className="col-12 col-md-6" key={keyGen()}>
                <ClassWrapper
                  month={month}
                  classes={matchClasses}
                  removeClass={removeClass}
                />
              </div>
            );
          })}
        </div>
        <div className="container-fluid">
          <div className="row justify-content-end">
            <button className="outlineButton" onClick={handleClick}>
              確認
            </button>
          </div>
        </div>
      </div>
    </Block>
  );
};

export default Preview;
