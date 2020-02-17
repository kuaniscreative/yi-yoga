import React, { Component, createContext } from 'react';
import firebase from '../../fbConfig';

const firestore = firebase.firestore();

export const regularCourseContext = createContext();

const initState = {
  regularCourse: []
};

class RegularCourseContextProvider extends Component {
  state = initState;

  componentDidMount() {
    this.getRegularCourse().then((snapshot) => {
      const regularCourse = snapshot.docs.map((doc) => {
        return doc.data();
      });
      this.setState({
        regularCourse,
        listener: this.realTimeUpdateListener()
      });
    });
  }

  componentWillUnmount() {
    // detach listener
    this.state.listener();
  }

  realTimeUpdateListener = () => {
    return firestore.collection('regularCourse').onSnapshot((query) => {
      const courses = query.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id
        };
      });
      this.updateRegularCourse({ courses });
    });
  };

  getRegularCourse = () => {
    return firestore.collection('regularCourse').get();
  };

  updateRegularCourse = (data = {}) => {
    this.setState({
      ...data
    });
  };

  render() {
    return (
      <regularCourseContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </regularCourseContext.Provider>
    );
  }
}

export default RegularCourseContextProvider;
