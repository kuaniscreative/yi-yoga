import firebase from '../fbConfig';
const firestore = firebase.firestore();

function updateClassProfile(userId, classId) {
  return firestore
    .collection('classProfile')
    .doc(classId)
    .get()
    .then((snap) => {
      const { pendingStudents } = snap.data();
      const newPendingStudents = pendingStudents.filter((userInfo) => {
        return userInfo.id !== userId;
      });
      return firestore
        .collection('classProfile')
        .doc(classId)
        .update({
          pendingStudents: newPendingStudents
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

      return firestore
        .collection('leaveRecord')
        .doc(userId)
        .update({
          reschedulable: firebase.firestore.FieldValue.arrayUnion(
            reschedulePendingInfo.leaveDate
          ),
          reschedulePending: firebase.firestore.FieldValue.arrayRemove(
            reschedulePendingInfo
          )
        });
    });
}

export default function rescheduleQueryDecline(userId, classId) {
  const tasks = [
    updateClassProfile(userId, classId),
    updateLeaveRecord(userId, classId)
  ];

  return Promise.all(tasks).then(() => {
    const sendQueryMail = firebase.functions().httpsCallable('rescheduleQuery');

    return firestore
      .collection('classProfile')
      .doc(classId)
      .get()
      .then((snap) => {
        const data = snap.data();
        const targetStudent = data.pendingStudents[0];

        if (targetStudent) {
          sendQueryMail({
            studentId: targetStudent.id,
            classId: classId
          });
        }
      });
  });
}
