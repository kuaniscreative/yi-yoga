import React, { createContext, useContext, useState, useEffect } from 'react';

// contexts
import { registerClassContext } from './registerClassContext';
import { openingSessionContext } from './openingSessionContext';

// functions
import { createCalendarData, deconstructSpan } from '../../functions/calendar';

export const calendarContext = createContext();

const CalendarContextProvider = (props) => {
  const { classes } = useContext(registerClassContext);
  const { session } = useContext(openingSessionContext);
  const [span, setSpan] = useState([]);
  useEffect(() => {
    if (session && session.hasOwnProperty('id')) {
      const span = deconstructSpan(session.span);
      setSpan(span);
    }
  }, [session]);

  const [calendars, setCalendars] = useState([]);
  useEffect(() => {
    if (span.length !== 0 && classes.length !== 0) {
      const calendarData = createCalendarData(span, classes);
      setCalendars(calendarData);
    }
  }, [span, classes]);

  return (
    <calendarContext.Provider value={{ calendars, span }}>
      {props.children}
    </calendarContext.Provider>
  );
};

export default CalendarContextProvider;
