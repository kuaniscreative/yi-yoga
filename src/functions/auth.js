import firebase from '../fbConfig';

export const signOut = () => {
  firebase.auth().signOut();
};
