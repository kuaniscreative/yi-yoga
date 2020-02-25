import firebase from '../fbConfig';
const firestore = firebase.firestore();

export const signIn = (credentials) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password);
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.auth().signOut();
  };
};

export const signUp = (userInfo) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
    .then((res) => {
      const uid = res.user.uid;
      function updateLeaceRecord(uid) {
        return firestore
          .collection('leaveRecord')
          .doc(uid)
          .set({
            records: [],
            reschedulable: [],
            reschedulePending: [],
            rescheduled: [],
            stamps: []
          });
      }
      function addUserInfo(uid) {
        return firestore
          .collection('user')
          .doc(res.user.uid)
          .set({
            name: userInfo.name || null,
            nickName: userInfo.nickName || null,
            email: userInfo.email || null,
            message: userInfo.message || null,
            validated: false
          });
      }
      const tasks = [updateLeaceRecord(uid), addUserInfo(uid)];

      return Promise.all(tasks);
    })
    .catch((err) => {
      function messageOutput(err) {
        switch (err.code) {
          case 'auth/email-already-in-use':
            return '帳號重複';
          case 'auth/invalid-email':
            return '請輸入正確信箱';
          default:
            return err.message;
        }
      }
      alert(messageOutput(err));
    });
};
