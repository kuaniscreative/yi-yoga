export const removeExpireClassProfile = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    /**
     *      取得classProfile並找出過期課堂
     */
    firestore
      .collection('classProfile')
      .get()
      .then((res) => {
        const data = res.docs.map((snap) => {
          return {
            ...snap.data(),
            id: snap.id
          };
        });
        const dueClasses = data.filter((classInfo) => {
          const date = classInfo.date.toDate();
          return timeIsDue(date);
        });
        const hasPendingStudent = dueClasses.filter((classInfo) => {
          return classInfo.pendingStudents.length > 0;
        });

        /**
         *      功能：退還補課機會
         */
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
              const leaveDate = currentPending.find((profile) => {
                return profile.pendingClassId === pendingClassId;
              }).leaveDate;

              return firestore
                .collection('leaveRecord')
                .doc(userId)
                .update({
                  reschedulePending: newPending,
                  reschedulable: firebase.firestore.FieldValue.arrayUnion(
                    leaveDate
                  )
                });
            });
        }

        function restorePendingStudents(hasPendingStudent) {
          const tasks = [];
          hasPendingStudent.forEach((classInfo) => {
            const pendingClassId = classInfo.id;
            const pendingStudents = classInfo.pendingStudents;
            pendingStudents.forEach((studentId) => {
              tasks.push(returnReschedulable(studentId, pendingClassId));
            });
          });

          return Promise.all(tasks);
        }

        /**
         *     功能： 從classProfile移除 && 新增到classHistory
         */
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
                ...classInfo
              });
            tasks.push(task);
          });
          return Promise.all(tasks);
        }

        /**
         *      如果有候補中學生，先退還補課機會再移除過期課程
         *      移除過期課程為非同步執行：從classProfile移除過期課程 && 新增過期課程資訊到classHistory
         */
        if (dueClasses.length) {
          const tasks = [
            removeFromClassProfile(dueClasses),
            createClassHistory(dueClasses)
          ];

          if (hasPendingStudent.length) {
            return restorePendingStudents(hasPendingStudent).then(() => {
              return Promise.all(tasks);
            });
          } else {
            return Promise.all(tasks);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const removeExpireUserClasses = (uid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    /**
     *      兩個大任務： 移除user.allClasses & leaveRecord.reschedulable中的過期課堂
     */

    function updateUserClasses(uid) {
      /**
       *      更新使用者課堂
       */
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
      /**
       *      更新leaveRecord
       */
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

    const tasks = [updateUserClasses(uid), updateLeaveRecord(uid)];

    Promise.all(tasks)
      .then(() => {
        console.log('ok');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

function timeIsDue(date) {
  const currentTime = new Date();
  return date - currentTime < 0;
}

// export const getDueDates = (dates) => {
//     const dueDates = [];
//     let i = 0;
//     while (timeIsDue(dates[i]) ) {
//         dueDates.push(dates[i]);
//         i++
//     }
//     return dueDates
// }
