import firebase from '../fbConfig';
const firestore = firebase.firestore();

function timeIsDue(date) {
  const currentTime = new Date();
  return date - currentTime < 0;
}

/** 兩個大任務： 移除 user.allClasses & leaveRecord.reschedulable 中的過期課堂 */
function updateUserClasses(uid) {
  return firestore
    .collection('user')
    .doc(uid)
    .get()
    .then((snap) => {
      const userData = snap.data();
      const allClasses = userData.allClasses;
      const dueClasses = allClasses.filter((classInfo) => {
        const date = classInfo.date.toDate();
        return timeIsDue(date);
      });

      if (dueClasses.length) {
        return firestore
          .collection('user')
          .doc(uid)
          .update({
            allClasses: firebase.firestore.FieldValue.arrayRemove(
              ...dueClasses
            ),
            classHistory: firebase.firestore.FieldValue.arrayUnion(
              ...dueClasses
            )
          });
      }
    });
}

function updateLeaveRecord(uid) {
  return firestore
    .collection('leaveRecord')
    .doc(uid)
    .get()
    .then((snap) => {
      const data = snap.data();
      const reschedulable = data.reschedulable;
      const currentTime = new Date();
      const due = reschedulable.filter((timestamp) => {
        const currentMonth = currentTime.getMonth();
        const classDate = timestamp.toDate();
        const available = [
          classDate.getMonth(),
          (classDate.getMonth() + 1) % 12
        ];
        return available.indexOf(currentMonth) < 0;
      });

      if (due.length) {
        return firestore
          .collection('leaveRecord')
          .doc(uid)
          .update({
            reschedulable: firebase.firestore.FieldValue.arrayRemove(...due)
          });
      }
    });
}

export default function removeExpireUserClasses(uid) {
  const tasks = [updateUserClasses(uid), updateLeaveRecord(uid)];

  return Promise.all(tasks);
}
