import React, { createContext, useContext, useState, useEffect } from 'react';
import firebase from '../../fbConfig';

// contexts
import { allUserContext } from './allUserContext';

export const allPaymentContext = createContext();
const firestore = firebase.firestore();

const AllPaymentContextProvider = (props) => {
  const { students } = useContext(allUserContext);
  const [payments, setPayments] = useState([]);

  const realTimeUpdateListener = () => {
    return firestore.collection('paymentStatus').onSnapshot((query) => {
      const payments = query.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id
        };
      });
      setPayments(payments);
    });
  };

  /**
   * Add firestore update listener
   */
  const preventMultipleCall = true;
  useEffect(() => {
    const listener = realTimeUpdateListener();
    return listener;
  }, [preventMultipleCall]);

  return (
    <allPaymentContext.Provider value={{ payments }}>
      {props.children}
    </allPaymentContext.Provider>
  );
};

export default AllPaymentContextProvider;
