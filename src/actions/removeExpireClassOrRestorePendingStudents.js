import firebase from '../fbConfig';
const firestore = firebase.firestore();

function timeIsDue(date) {
  if (!date) {
    return false;
  }
  const currentTime = new Date();
  return !(currentTime - date < 0);
}

function shouldRemoveClass(date) {
  if (!date) {
    return false;
  }
  const currentTime = new Date();
  return !(currentTime - date < 5529600000); // 64 days;
}

/** 功能：退還補課機會 */
function returnReschedulable(userId, pendingClassId) {
  return firestore
    .collection('leaveRecord')
    .doc(userId)
    .get()
    .then((res) => {
      const data = res.data();
      const currentPending = data.reschedulePending;
      const newPending = currentPending.filter((profile) => {
        return profile.pendingClassId !== pendingClassId;
      });
      const leaveTarget = currentPending.find((profile) => {
        return profile.pendingClassId === pendingClassId;
      });

      const { leaveDate } = leaveTarget ? leaveTarget : {};

      if (leaveDate) {
        return firestore
          .collection('leaveRecord')
          .doc(userId)
          .update({
            reschedulePending: newPending,
            reschedulable: firebase.firestore.FieldValue.arrayUnion(leaveDate),
          });
      }
    });
}

function removePendingStudents(classIds) {
  const tasks = classIds.map((classId) => {
    return firestore.collection('classProfile').doc(classId).update({
      pendingStudents: [],
    });
  });

  return Promise.all(tasks);
}

function restorePendingStudents(hasPendingStudentClasses) {
  const tasks = [];
  const hasPendingStudentClassIds = [];
  hasPendingStudentClasses.forEach((classInfo) => {
    const pendingClassId = classInfo.id;
    const pendingStudents = classInfo.pendingStudents;
    hasPendingStudentClassIds.push(pendingClassId);
    pendingStudents.forEach((studentInfo) => {
      tasks.push(returnReschedulable(studentInfo.id, pendingClassId));
    });
  });

  return Promise.all(tasks).then(() => {
    removePendingStudents(hasPendingStudentClassIds);
  });
}

/** 功能： 從 classProfile 移除 && 新增到 classHistory */
function removeFromClassProfile(dueClasses) {
  const tasks = [];
  dueClasses.forEach((classInfo) => {
    const task = firestore
      .collection('classProfile')
      .doc(classInfo.id)
      .delete();
    tasks.push(task);
  });
  return Promise.all(tasks);
}

function createClassHistory(dueClasses) {
  const tasks = [];
  dueClasses.forEach((classInfo) => {
    const task = firestore
      .collection('classHistory')
      .doc(classInfo.id)
      .set({
        ...classInfo,
      });
    tasks.push(task);
  });
  return Promise.all(tasks);
}

export default function removeExpireClassOrRestorePendingStudents() {
  /** 第一步：取得classProfile並找出過期課堂 */
  return firestore
    .collection('classProfile')
    .get()
    .then((res) => {
      const classProfile = res.docs.map((snap) => {
        return {
          ...snap.data(),
          id: snap.id,
        };
      });
      const dueClasses = classProfile.filter((classInfo) => {
        const date = classInfo.date.toDate();
        return timeIsDue(date);
      });
      const shouldBeRemovedClasses = classProfile.filter((classInfo) => {
        const date = classInfo.date.toDate();
        return shouldRemoveClass(date);
      });
      const hasPendingStudentClasses = dueClasses.filter((classInfo) => {
        return classInfo.pendingStudents.length > 0;
      });

      /** 第二步：如果有候補中學生，先退還補課機會再移除過期課程 */
      if (dueClasses.length && hasPendingStudentClasses.length) {
        return restorePendingStudents(hasPendingStudentClasses).then(() => {
          if (shouldBeRemovedClasses.length) {
            const tasks = [
              removeFromClassProfile(dueClasses),
              createClassHistory(dueClasses),
            ];

            return Promise.all(tasks);
          }
        });
      } else {
        if (shouldBeRemovedClasses.length) {
          const tasks = [
            removeFromClassProfile(dueClasses),
            createClassHistory(dueClasses),
          ];

          return Promise.all(tasks);
        }
      }
    });
}
