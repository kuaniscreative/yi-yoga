import React, { Component, createContext } from 'react';
import firebase from '../../fbConfig';

const firestore = firebase.firestore();
const auth = firebase.auth();

export const allUserContext = createContext();

const initState = {
  students: [],
  listener: null
};

class AllUserContextProvider extends Component {
  state = initState;

  componentDidMount() {
    this.getUserData().then((snapshot) => {
      const students = snapshot.docs.map((doc) => {
        return doc.data();
      });
      this.setState({
        students,
        listener: this.realTimeUpdateListener()
      });
    });
  }

  realTimeUpdateListener = () => {
    return firestore.collection('user').onSnapshot((query) => {
      const students = query.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id
        };
      });
      this.updateUserData({ students });
    });
  };

  getUserData = () => {
    return firestore.collection('user').get();
  };

  updateUserData = (data = {}) => {
    this.setState({
      ...data
    });
  };

  render() {
    return (
      <allUserContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </allUserContext.Provider>
    );
  }
}

export default AllUserContextProvider;
