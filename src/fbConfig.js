import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

const prodConfig = {
  apiKey: 'AIzaSyBn-U0qM2EaZOheotCkel7VO-QToNCOh4s',
  authDomain: 'class-manage-80e60.firebaseapp.com',
  databaseURL: 'https://class-manage-80e60.firebaseio.com',
  projectId: 'class-manage-80e60',
  storageBucket: 'class-manage-80e60.appspot.com',
  messagingSenderId: '215301096460',
  appId: '1:215301096460:web:a1be60462745aacc9d9a29',
  measurementId: 'G-43MPXB80T8'
};

const devConfig = {
  apiKey: 'AIzaSyCs1r4iDSHJ-xK6E3BFswzmb2zdZl00g6M',
  authDomain: 'class-manage-dev.firebaseapp.com',
  databaseURL: 'https://class-manage-dev.firebaseio.com',
  projectId: 'class-manage-dev',
  storageBucket: 'class-manage-dev.appspot.com',
  messagingSenderId: '310170459856',
  appId: '1:310170459856:web:1e75c9b40be43f13b0c8d5'
};

const config =
  process.env.REACT_APP_FB_CONFIG === 'dev' ? devConfig : prodConfig;

// Initialize Firebase*
firebase.initializeApp(config);

export default firebase;
