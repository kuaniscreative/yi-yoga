import firebase from '../fbConfig';
const firestore = firebase.firestore();

function timeIsDue(date) {
  if (!date) {
    return false;
  }
  const currentTime = new Date();
  return !(currentTime - date < 5529600000); // 64 days
}

/** 兩個大任務： 移除 user.allClasses & leaveRecord.reschedulable 中的過期課堂 */
function getClassProfile() {
  return firestore
    .collection('classProfile')
    .get()
    .then((res) => {
      return res.docs.map((snap) => {
        return {
          ...snap.data(),
          id: snap.id,
        };
      });
    });
}

function getUserProfile(uid) {
  return firestore
    .collection('user')
    .doc(uid)
    .get()
    .then((res) => {
      return res.data();
    });
}

function updateUserClasses(uid) {
  const tasks = [getClassProfile(), getUserProfile(uid)];

  return Promise.all(tasks).then((res) => {
    const [classProfiles, userData] = res;
    const { allClasses = [] } = userData;
    const dueClasses = allClasses
      .map((userClassId) => {
        return classProfiles.find((classInfo) => {
          return classInfo.id === userClassId;
        });
      })
      .filter((classInfo) => {
        if (!classInfo) {
          return false;
        }

        const date = classInfo.date.toDate();
        return timeIsDue(date);
      });

    if (dueClasses.length) {
      return firestore
        .collection('user')
        .doc(uid)
        .update({
          allClasses: firebase.firestore.FieldValue.arrayRemove(
            ...dueClasses.map((classInfo) => {
              return classInfo.id;
            })
          ),
          classHistory: firebase.firestore.FieldValue.arrayUnion(
            ...dueClasses.map((classInfo) => {
              return classInfo.id;
            })
          ),
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
        const today = new Date();
        const currentMonth = currentTime.getMonth();
        const classDate = timestamp.toDate();
        const available = [
          classDate.getMonth(),
          (classDate.getMonth() + 1) % 12,
        ];
        return today.valueOf() > classDate.valueOf() && available.indexOf(currentMonth) < 0;
      });

      if (due.length) {
        return firestore
          .collection('leaveRecord')
          .doc(uid)
          .update({
            reschedulable: firebase.firestore.FieldValue.arrayRemove(...due),
          });
      }
    });
}

export default function removeExpireUserClasses(uid) {
  const tasks = [updateUserClasses(uid), updateLeaveRecord(uid)];

  return Promise.all(tasks);
}
