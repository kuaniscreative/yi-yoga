import firebase from '../fbConfig';
const firestore = firebase.firestore();

/**
 *      報名時有三個步驟：
 *      1. 更新user資料
 *      2. 將 uid 加入至 classProfile 當中
 *      3. 新增付款資料
 */

function updateUserData(classes, userId) {
  return firestore
    .collection('user')
    .doc(userId)
    .update({
      allClasses: firebase.firestore.FieldValue.arrayUnion(...classes)
    });
}

function addStudentToClasses(classIds, userData) {
  const tasks = [];
  classIds.forEach((id) => {
    const task = firestore
      .collection('classProfile')
      .doc(id)
      .update({
        students: firebase.firestore.FieldValue.arrayUnion({
          name: userData.name,
          nickName: userData.nickName,
          email: userData.email,
          id: userData.id
        })
      });
    tasks.push(task);
  });

  return Promise.all(tasks);
}

function addPaymentStatus(userData, sessionName, sessionId, amount) {
  return firestore.collection('paymentStatus').add({
    amount: amount,
    method: null,
    owner: {
      name: userData.name,
      nickName: userData.nickName,
      id: userData.id
    },
    sessionName: sessionName,
    sessionId: sessionId,
    moneyReceived: false,
    moneySent: false
  });
}

export const registerToCourse = (
  classes,
  userData,
  sessionName,
  sessionId,
  amount
) => {
  const tasks = [
    updateUserData(classes, userData.id),
    addStudentToClasses(classes, userData),
    addPaymentStatus(userData, sessionName, sessionId, amount)
  ];

  return Promise.all(tasks);
};
