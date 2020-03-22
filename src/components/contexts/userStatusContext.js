import React, { createContext, useContext, useState, useEffect } from 'react';
import firebase from '../../fbConfig';

// contexts
import { userContext } from './userContext';
import { allClassContext } from './allClassContext';

// functions
import { getUserClasses } from '../../functions/userStatusHelpers';

export const userStatusContext = createContext();
const firestore = firebase.firestore();

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
      const absenceClasses = getClasses('absence');
      setUserClasses(userClasses);
      setRescheduleClasses(rescheduleClasses);
      setPendingClasses(pendingClasses);
      setAbsenceClasses(absenceClasses);
    }
  }, [uid, classes]);

  /**
   * get leave record
   */
  const [leaveRecord, setLeaveRecord] = useState({});
  const leaveRecordUpdateListener = () => {
    return firestore
      .collection('leaveRecord')
      .doc(uid)
      .onSnapshot((snapshot) => {
        const record = snapshot.data();
        record.reschedulable = record.reschedulable.map((timestamp) => {
          return timestamp.toDate();
        });
        record.records = record.records.map((timestamp) => {
          return timestamp.toDate();
        });
        setLeaveRecord(record);
      });
  };

  useEffect(() => {
    const listener = leaveRecordUpdateListener();
    return listener;
  }, []);

  /** get payments */
  const [payments, setPayments] = useState([]);
  const paymentsUpdateListener = () => {
    return firestore
      .collection('paymentStatus')
      .where('owner.id', '==', uid)
      .onSnapshot((snapshot) => {
        const payments = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setPayments(payments);
      });
  };

  useEffect(() => {
    const listener = paymentsUpdateListener();
    return listener;
  }, []);

  return (
    <userStatusContext.Provider
      value={{
        userClasses,
        rescheduleClasses,
        pendingClasses,
        absenceClasses,
        leaveRecord,
        payments
      }}
    >
      {props.children}
    </userStatusContext.Provider>
  );
};

export default UserStatusContextProvider;
