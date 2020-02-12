import React, { Component, createContext } from 'react';
import firebase from '../../fbConfig';

const firestore = firebase.firestore();
const auth = firebase.auth();

export const userContext = createContext();

const initState = {
  uid: '',
  name: '',
  nickName: '',
  email: '',
  validated: false
};

class UserContextProvider extends Component {
  state = initState;

  componentDidMount() {
    // 監聽 firebase auth 狀態，更動 data 並監聽 firestore 資料變動
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.getUserData(user.uid).then((snapshot) => {
          const data = snapshot.data();
          this.setState({
            uid: user.uid,
            listener: this.realTimeUpdateListener(user.uid),
            ...data
          });
        });
      }
    });
  }

  realTimeUpdateListener = (uid) => {
    return firestore
      .collection('user')
      .doc(uid)
      .onSnapshot((snapshot) => {
        const data = snapshot.data();
        this.updateUserData(data);
      });
  };

  getUserData = (uid) => {
    return firestore
      .collection('user')
      .doc(uid)
      .get();
  };

  updateUserData = (data = {}) => {
    this.setState({
      ...data
    });
  };

  render() {
    return (
      <userContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </userContext.Provider>
    );
  }
}

export default UserContextProvider;