import React, { createContext, useState, useEffect } from 'react';
import firebase from '../../fbConfig';

export const sessionContext = createContext();
const firestore = firebase.firestore();

const SessionContextProvider = (props) => {
  const [sessions, setSessions] = useState([]);
  const realTimeUpdateListener = () => {
    return firestore.collection('session').onSnapshot((query) => {
      const sessions = query.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id
        };
      });
      setSessions(sessions);
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
    <sessionContext.Provider value={{ sessions }}>
      {props.children}
    </sessionContext.Provider>
  );
};

export default SessionContextProvider;
