import React, { Component, createContext } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../fbConfig';

const firestore = firebase.firestore();
const auth = firebase.auth();

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

class UserContextProvider extends Component {
  state = { ...initState };

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
      } else {
        this.setState(initState, this.redirectToIndex);
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

  redirectToIndex = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <userContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </userContext.Provider>
    );
  }
}

export default withRouter(UserContextProvider);
