import React, { Component, createContext } from 'react';
import firebase from '../../fbConfig';

const firestore = firebase.firestore();

export const allClassContext = createContext();

const initState = {
  classes: null
};

class AllClassContextProvider extends Component {
  state = {
    ...initState
  };

  updateClassProfile = (data = []) => {
    this.setState({
      classes: data
    });
  };

  realTimeUpdateListener = () => {
    return firestore.collection('classProfile').onSnapshot((query) => {
      const classes = query.docs.map((doc) => {
        return doc.data();
      });
      this.updateClassProfile(classes);
    });
  };

  componentDidMount() {
    if (this.state.classes === null) {
      this.setState({
        listener: this.realTimeUpdateListener()
      });
    }
  }

  componentWillUnmount() {
    // detach listener
    this.state.listener();
  }

  render() {
    return (
      <allClassContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </allClassContext.Provider>
    );
  }
}

export default AllClassContextProvider;
