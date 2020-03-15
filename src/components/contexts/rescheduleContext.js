import React, { createContext, useState } from 'react';

export const rescheduleContext = createContext();

function RescheduleContextProvider({ children }) {
  const [leaveClass, setLeaveClass] = useState(null);

  return (
    <rescheduleContext.Provider value={{ leaveClass, setLeaveClass }}>
      {children}
    </rescheduleContext.Provider>
  );
}

export default RescheduleContextProvider;
