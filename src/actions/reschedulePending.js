import firebase from '../fbConfig';
const firestore = firebase.firestore();

function updateClassProfile(classId, userInfo) {
  const { name, nickName, email, uid } = userInfo;
  return firestore
    .collection('classProfile')
    .doc(classId)
    .update({
      pendingStudents: firebase.firestore.FieldValue.arrayUnion({
        name,
        nickName,
        email,
        id: uid
      })
    });
}

function updateLeaveRecord(classId, userId, leaveClassDate) {
  const pendingInfo = {
    leaveDate: leaveClassDate,
    pendingClassId: classId
  };

  return firestore
    .collection('leaveRecord')
    .doc(userId)
    .update({
      reschedulable: firebase.firestore.FieldValue.arrayRemove(leaveClassDate),
      reschedulePending: firebase.firestore.FieldValue.arrayUnion(pendingInfo)
    });
}

export default function reschedulePending(classId, userInfo, leaveClassDate) {
  const tasks = [
    updateClassProfile(classId, userInfo),
    updateLeaveRecord(classId, userInfo.uid, leaveClassDate)
  ];

  return Promise.all(tasks);
}
