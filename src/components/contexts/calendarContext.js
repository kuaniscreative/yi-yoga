import React, { createContext, useContext, useState } from 'react';

// contexts
import { registerClassContext } from './registerClassContext';
import { openingSessionContext } from './openingSessionContext';

// functions
import { createCalendarData } from '../../functions/calendar';

export const calendarContext = createContext();

const CalendarContextProvider = (props) => {
  const { classes, selectedClasses } = useContext(registerClassContext);
  const { session } = useContext(openingSessionContext);
  const span = session ? session.span : [];
  const calendarData = createCalendarData(span, classes);

  const [calendars, setCalendars] = useState([]);
  console.log(calendarData);

  return <calendarContext.Provider>{props.children}</calendarContext.Provider>;
};

export default CalendarContextProvider;
