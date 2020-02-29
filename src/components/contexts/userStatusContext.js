import React, { createContext, useContext, useState, useEffect } from 'react';

// contexts
import { userContext } from './userContext';
import { allClassContext } from './allClassContext';

// functions
import { getUserClasses } from '../../functions/userStatusHelpers';

export const userStatusContext = createContext();

const UserStatusContextProvider = (props) => {
  /**
   * get classes
   */
  const { uid } = useContext(userContext);
  const { classes } = useContext(allClassContext);
  const [userClasses, setUserClasses] = useState([]);
  const [rescheduleClasses, setRescheduleClasses] = useState([]);
  const [pendingClasses, setPendingClasses] = useState([]);
  const [absenceClasses, setAbsenceClasses] = useState([]);
  useEffect(() => {
    if (classes.length !== 0 && uid) {
      const getClasses = (key) => {
        return getUserClasses(uid, key, classes);
      };
      const userClasses = getClasses('students');
      const rescheduleClasses = getClasses('rescheduleStudents');
      const pendingClasses = getClasses('pendingStudents');
      const absenceClasses = getClasses('absense');
      setUserClasses(userClasses);
      setRescheduleClasses(rescheduleClasses);
      setPendingClasses(pendingClasses);
      setAbsenceClasses(absenceClasses);
    }
  }, [uid, classes]);

  return (
    <userStatusContext.Provider
      value={{ userClasses, rescheduleClasses, pendingClasses, absenceClasses }}
    >
      {props.children}
    </userStatusContext.Provider>
  );
};

export default UserStatusContextProvider;
