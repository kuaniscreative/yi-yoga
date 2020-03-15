import React, { useContext } from 'react';

// components
import ClassListItem from './reschedule_LeaveClassListItem';

// contexts
import { userStatusContext } from '../contexts/userStatusContext';

// functions
import keyGen from '../../functions/keyGen';

const LeaveClassList = () => {
  /** Get reschedulable classes from leaveRecord */
  const { leaveRecord } = useContext(userStatusContext);
  const { reschedulable = [] } = leaveRecord;

  return (
    <ul className="col-12 col-md-6">
      {reschedulable.length &&
        reschedulable.map((date) => {
          return <ClassListItem date={date} key={keyGen()} />;
        })}
    </ul>
  );
};

export default LeaveClassList;
