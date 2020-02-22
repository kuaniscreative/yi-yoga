import React, { Component, createContext } from 'react';
import firebase from '../../fbConfig';

const firestore = firebase.firestore();

export const regularCourseContext = createContext();

const initState = {
  regularCourse: []
};

class RegularCourseContextProvider extends Component {
  state = { ...initState };

  componentDidMount() {
    this.setState({
      listener: this.realTimeUpdateListener()
    });
  }

  componentWillUnmount() {
    // detach listener
    this.state.listener();
  }

  realTimeUpdateListener = () => {
    return firestore
      .collection('regularCourse')
      .orderBy('reference', 'asc')
      .onSnapshot((query) => {
        const regularCourse = query.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id
          };
        });
        this.updateRegularCourse({ regularCourse });
      });
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
