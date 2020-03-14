import React, { createContext, useState } from 'react';

export const leaveContext = createContext();

function LeaveContextProvider({ children }) {
  const [leaveTargetId, setLeaveTargetId] = useState(null);
  return (
    <leaveContext.Provider value={{ leaveTargetId, setLeaveTargetId }}>
      {children}
    </leaveContext.Provider>
  );
}

export default LeaveContextProvider;
