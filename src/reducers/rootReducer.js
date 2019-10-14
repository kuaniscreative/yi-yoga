import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

// own reducers
import adminReducer from './adminReducer';


const rootReducer = combineReducers({
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    admin: adminReducer
})

export default rootReducer