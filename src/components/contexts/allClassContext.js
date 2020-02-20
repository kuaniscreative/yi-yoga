import React, { Component, createContext } from 'react';
import firebase from '../../fbConfig';

const firestore = firebase.firestore();

export const allClassContext = createContext();

const initState = {
  classes: [],
  requestState: 'initial'
};

class AllClassContextProvider extends Component {
  state = {
    ...initState
  };

  setRequestState = () => {
    const states = {
      initial: 'requested'
    };
    return states[this.state.requestState];
  };

  updateClassProfile = (data = []) => {
    this.setState({
      classes: data
    });
  };

  realTimeUpdateListener = () => {
    return firestore.collection('classProfile').onSnapshot((query) => {
      const classes = query.docs.map((doc) => {
        const classSingle = doc.data();
        const date = classSingle.date.toDate();
        return {
          ...classSingle,
          date
        };
      });
      this.updateClassProfile(classes);
    });
  };

  componentDidMount() {
    if (this.state.requestState === 'initial') {
      this.setState({
        requestState: this.setRequestState(),
        listener: this.realTimeUpdateListener()
      });
    }
  }

  componentWillUnmount() {
    console.log('unmount fired');
    // detach listener
    this.state.listener();
  }

  render() {
    const classes = this.state.classes;
    return (
      <allClassContext.Provider value={{ classes }}>
        {this.props.children}
      </allClassContext.Provider>
    );
  }
}

export default AllClassContextProvider;
