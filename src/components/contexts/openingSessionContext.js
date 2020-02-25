import React, { createContext, useState, useEffect } from 'react';
import firebase from '../../fbConfig';

export const openingSessionContext = createContext();
const firestore = firebase.firestore();

const OpeningSessionContextProvider = (props) => {
  const [session, setSession] = useState({});
  const realTimeUpdateListener = () => {
    return firestore
      .collection('session')
      .where('open', '==', true)
      .onSnapshot((query) => {
        const sessions = query.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id
          };
        });
        setSession(sessions[0]);
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
    <openingSessionContext.Provider value={{ session }}>
      {props.children}
    </openingSessionContext.Provider>
  );
};

export default OpeningSessionContextProvider;
