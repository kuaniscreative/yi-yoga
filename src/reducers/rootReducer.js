import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

// own reducers
import adminReducer from './adminReducer';
import userReducer from './userReducer';
import pageReducer from './pageReducer';
import authReducer from './authReducer';
import registerClassReducer from './registerClassReducer';


const rootReducer = combineReducers({
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    admin: adminReducer,
    user: userReducer,
    auth: authReducer,
    registerClass: registerClassReducer,
    pageControl: pageReducer
})

export default rootReducer