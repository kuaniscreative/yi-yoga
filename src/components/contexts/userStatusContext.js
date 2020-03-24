import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo
} from 'react';
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

  /** Get reschedulable classes */
  const reschedulableClasses = useMemo(() => {
    if (!Object.keys(leaveRecord).length || !classes.length) {
      return [];
    }
    const reschedulableValues = leaveRecord.reschedulable.map((date) => {
      return date.valueOf();
    });

    return classes.filter((classInfo) => {
      return ~reschedulableValues.indexOf(classInfo.date.valueOf());
    });
  }, [leaveRecord, classes]);

  /** Get rescheduled Infos */
  const rescheduledInfos = useMemo(() => {
    if (!Object.keys(leaveRecord).length || !classes.length) {
      return [];
    }

    return leaveRecord.rescheduled.map((rescheduledInfo) => {
      const { leaveDate, rescheduleClassId } = rescheduledInfo;
      const leaveDateValue = leaveDate.hasOwnProperty('seconds')
        ? leaveDate.toDate().valueOf()
        : leaveDate.valueOf();

      return {
        leaveClass: classes.find((classInfo) => {
          return classInfo.date.valueOf() === leaveDateValue;
        }),
        rescheduleClass: classes.find((classInfo) => {
          return classInfo.id === rescheduleClassId;
        })
      };
    });
  }, [leaveRecord, classes]);

  return (
    <userStatusContext.Provider
      value={{
        userClasses,
        rescheduleClasses,
        pendingClasses,
        absenceClasses,
        leaveRecord,
        payments,
        reschedulableClasses,
        rescheduledInfos
      }}
    >
      {props.children}
    </userStatusContext.Provider>
  );
};

export default UserStatusContextProvider;
