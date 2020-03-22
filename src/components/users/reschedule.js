import React, { useContext } from 'react';

// components
import TitleBlock from '../ui/titleBlock';
import DefaultBlock from './reschedule_defaultBlock';
import ClassSelectorBlock from './reschedule_classSelectorBlock';
import Success from './reschedule_success';

// contexts
import { userStatusContext } from '../contexts/userStatusContext';
import { rescheduleContext } from '../contexts/rescheduleContext';

const Reschedule = () => {
  const { leaveRecord } = useContext(userStatusContext);
  const { reschedulable = [] } = leaveRecord;

  /** Get variables for component display logic */
  const { step, rescheduleType } = useContext(rescheduleContext);

  return (
    <div>
      <TitleBlock title="補課" />
      {step === 'result' ? (
        <Success rescheduleType={rescheduleType} />
      ) : reschedulable.length ? (
        <ClassSelectorBlock />
      ) : (
        <DefaultBlock />
      )}
    </div>
  );
};

export default Reschedule;
