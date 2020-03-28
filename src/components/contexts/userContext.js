import React, { createContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../fbConfig';

// actions
import removeExpireUserClasses from '../../actions/removeExpireUserClasses';

const firestore = firebase.firestore();
const auth = firebase.auth();

function getUserData(uid) {
  return firestore
    .collection('user')
    .doc(uid)
    .get();
}

export const userContext = createContext();

const initState = {
  uid: '',
  name: '',
  nickName: '',
  email: '',
  allClasses: [],
  isAdmin: false,
  validated: false
};

const UserContextProvider = ({ children, history }) => {
  /** User data as state */
  const [userInfo, setUserInfo] = useState(initState);

  /** 監聽 firebase auth 狀態，更動 data 並監聽 firestore 資料變動 */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getUserData(user.uid).then((snapshot) => {
          const data = snapshot.data();
          setUserInfo({
            uid: user.uid,
            ...data
          });
          removeExpireUserClasses(user.uid);
        });
      } else {
        setUserInfo(initState);
        history.push('/');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userContext.Provider value={{ ...userInfo }}>
      {children}
    </userContext.Provider>
  );
};

export default withRouter(UserContextProvider);
