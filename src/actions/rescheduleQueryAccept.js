import firebase from '../fbConfig';
const firestore = firebase.firestore();

function updateClassProfile(userId, classId) {
  return firestore
    .collection('classProfile')
    .doc(classId)
    .get()
    .then((snap) => {
      const { pendingStudents, rescheduleStudents } = snap.data();
      const currentStudent = pendingStudents.find((userInfo) => {
        return userInfo.id === userId;
      });
      const newPendingStudents = pendingStudents.filter((userInfo) => {
        return userInfo.id !== userId;
      });

      return firestore
        .collection('classProfile')
        .doc(classId)
        .update({
          pendingStudents: newPendingStudents,
          rescheduleStudents: [...rescheduleStudents, currentStudent]
        });
    });
}

function updateLeaveRecord(userId, classId) {
  return firestore
    .collection('leaveRecord')
    .doc(userId)
    .get()
    .then((snap) => {
      const data = snap.data();
      const reschedulePendingInfo = data.reschedulePending.find((info) => {
        return info.pendingClassId === classId;
      });
      const rescheduleInfo = {
        leaveDate: reschedulePendingInfo.leaveDate,
        rescheduleClassId: classId
      };

      return firestore
        .collection('leaveRecord')
        .doc(userId)
        .update({
          rescheduled: firebase.firestore.FieldValue.arrayUnion(rescheduleInfo),
          reschedulePending: firebase.firestore.FieldValue.arrayRemove(
            reschedulePendingInfo
          )
        });
    });
}

export default function rescheduleQueryAccept(userId, classId) {
  const tasks = [
    updateClassProfile(userId, classId),
    updateLeaveRecord(userId, classId)
  ];

  return Promise.all(tasks);
}
