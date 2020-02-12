import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// firebase
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { compose } from 'redux';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import { getFirestore, reduxFirestore } from 'redux-firestore';
import fbConfig from './fbConfig';

// reducers
import rootReducer from './reducers/rootReducer';

// contexts
import UserContext from './components/contexts/userContext';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(fbConfig),
    reduxFirestore(fbConfig)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <UserContext>
      <App />
    </UserContext>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
