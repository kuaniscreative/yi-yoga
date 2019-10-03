import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyBn-U0qM2EaZOheotCkel7VO-QToNCOh4s",
    authDomain: "class-manage-80e60.firebaseapp.com",
    databaseURL: "https://class-manage-80e60.firebaseio.com",
    projectId: "class-manage-80e60",
    storageBucket: "",
    messagingSenderId: "215301096460",
    appId: "1:215301096460:web:a1be60462745aacc9d9a29",
    measurementId: "G-43MPXB80T8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase