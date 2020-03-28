import firebase from '../fbConfig';
const firestore = firebase.firestore();

function updateLeaveRecord(userId, leaveDate, pendingClassId) {
  return firestore
    .collection('leaveRecord')
    .doc(userId)
    .update({
      reschedulePending: firebase.firestore.FieldValue.arrayRemove({
        leaveDate,
        pendingClassId
      }),
      reschedulable: firebase.firestore.FieldValue.arrayUnion(leaveDate)
    });
}

function updateClassProfile(userId, pendingClassId) {
  return firestore
    .collection('classProfile')
    .doc(pendingClassId)
    .get()
    .then((res) => {
      const data = res.data();
      const { pendingStudents } = data;
      const newPendingStudents = pendingStudents.filter((student) => {
        return student.id !== userId;
      });

      return firestore
        .collection('classProfile')
        .doc(pendingClassId)
        .update({
          pendingStudents: newPendingStudents
        });
    });
}

export default function cancelReschedulePending(
  userId,
  leaveDate,
  pendingClassId
) {
  const tasks = [
    updateLeaveRecord(userId, leaveDate, pendingClassId),
    updateClassProfile(userId, pendingClassId)
  ];

  return Promise.all(tasks);
}
