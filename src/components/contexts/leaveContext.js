import React, { createContext, useState } from 'react';

export const leaveContext = createContext();

function LeaveContextProvider({ children }) {
  const [leaveTarget, setLeaveTarget] = useState(null);
  return (
    <leaveContext.Provider value={{ leaveTarget, setLeaveTarget }}>
      {children}
    </leaveContext.Provider>
  );
}

export default LeaveContextProvider;
