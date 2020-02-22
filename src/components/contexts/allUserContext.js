import React, { Component, createContext } from 'react';
import firebase from '../../fbConfig';

const firestore = firebase.firestore();

export const allUserContext = createContext();

const initState = {
  students: [],
  listener: null
};

class AllUserContextProvider extends Component {
  state = { ...initState };

  componentDidMount() {
    this.setState({
      listener: this.realTimeUpdateListener()
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
