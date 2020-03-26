import React, { useContext } from 'react';

// contexts
import { userStatusContext } from '../contexts/userStatusContext';

const Arrangements = () => {
  const { rescheduleInfos, reschedulePending } = useContext(userStatusContext);

  console.log(rescheduleInfos, reschedulePending, 'hhhhhh');

  return <div>請假 & 補課</div>;
};

export default Arrangements;
