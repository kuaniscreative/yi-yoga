// register classes
export const registerToCourse = (
  classes,
  userData,
  sessionName,
  sessionId,
  amount
) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    dispatch({ type: 'LOADING' });

    /**
     *
     *      報名時有三個步驟：
     *      1. 更新user資料
     *      2. 將uid加入至classProfile當中
     *      3. 新增付款資料
     *
     */
    function updateUserData(classes, userId) {
      return firestore
        .collection('user')
        .doc(userId)
        .update({
          allClasses: firebase.firestore.FieldValue.arrayUnion(...classes)
        });
    }

    function addStudentToClasses(classInfos, userData) {
      const ids = classInfos.map((info) => {
        return info.id;
      });
      const tasks = [];
      ids.forEach((id) => {
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

    function addPaymentStatus(userId, sessionName, sessionId, amount) {
      return firestore.collection('paymentStatus').add({
        amount: amount,
        method: null,
        owner: userId,
        sessionName: sessionName,
        sessionId: sessionId,
        moneyReceived: false,
        moneySent: false
      });
    }

    const tasks = [
      updateUserData(classes, userData.id),
      addStudentToClasses(classes, userData),
      addPaymentStatus(userData.id, sessionName, sessionId, amount).then(
        (res) => {
          dispatch({ type: 'ADD_PAYMENT_SUCCESS', id: res.id });
        }
      )
    ];

    Promise.all(tasks)
      .then(() => {
        dispatch({ type: 'REGISTERED_TO_COURSE' });
        dispatch({
          type: 'CLEAR_SELECTION_WHEN_REGISTER_TO_CLASS_SUCCESS'
        });
        dispatch({ type: 'LOADED' });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updatePaymentStatus = (paymentId, method, account, date) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection('paymentStatus')
      .doc(paymentId)
      .update({
        method: method,
        account: account,
        date: date,
        moneySent: true
      })
      .then(() => {
        dispatch({ type: 'UPDATE_PAYMENT_SUCCESS' });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// leave application
export const leaveApplication = (userId, classInfo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    /**
     *
     *      請假有三個任務要做
     *      1. 更新使用者資料
     *      2. 更新classProfile
     *          ---- 更新時要移動候補學生
     *      3. 更新leaveRecord
     *
     */
    dispatch({ type: 'LOADING' });
    function updateUserDate(userId, classInfo) {
      return firestore
        .collection('user')
        .doc(userId)
        .update({
          allClasses: firebase.firestore.FieldValue.arrayRemove(classInfo),
          leave: firebase.firestore.FieldValue.arrayUnion(classInfo)
        });
    }
    function updateClassProfile(userId, classInfo) {
      return firestore
        .collection('classProfile')
        .doc(classInfo.id)
        .get()
        .then((res) => {
          const data = res.data();
          const classTime = data.date.toDate();
          const mm = classTime.getMonth();
          const dd = classTime.getDate();
          const hr = classTime.getHours();
          const min = classTime.getMinutes();
          const dateString = `${mm + 1}月${dd}日`;
          const startAt = `${hr}:${min < 10 ? `0${min}` : min}`;
          const thePendingStudent = data.pendingStudents[0];
          if (thePendingStudent) {
            const currentTime = new Date();
            const classStartWithinTwoHour = classTime - currentTime < 7200000;

            if (classStartWithinTwoHour) {
              const sendQueryMail = firebase
                .functions()
                .httpsCallable('rescheduleQuery');
              sendQueryMail({
                studentId: thePendingStudent,
                classId: res.id,
                dateString: dateString,
                startAt: startAt
              });

              return firestore
                .collection('classProfile')
                .doc(classInfo.id)
                .update({
                  students: firebase.firestore.FieldValue.arrayRemove(userId),
                  absence: firebase.firestore.FieldValue.arrayUnion(userId)
                });
            } else {
              const sendNotification = firebase
                .functions()
                .httpsCallable('rescheduleSuccessNotification');
              sendNotification({
                studentId: thePendingStudent,
                dateString: dateString,
                startAt: startAt
              });

              return firestore
                .collection('classProfile')
                .doc(classInfo.id)
                .update({
                  pendingStudents: firebase.firestore.FieldValue.arrayRemove(
                    thePendingStudent
                  ),
                  rescheduleStudents: firebase.firestore.FieldValue.arrayUnion(
                    thePendingStudent
                  ),
                  students: firebase.firestore.FieldValue.arrayRemove(userId),
                  absence: firebase.firestore.FieldValue.arrayUnion(userId)
                });
            }
          } else {
            return firestore
              .collection('classProfile')
              .doc(classInfo.id)
              .update({
                students: firebase.firestore.FieldValue.arrayRemove(userId),
                absence: firebase.firestore.FieldValue.arrayUnion(userId)
              });
          }
        });
    }
    function updateLeaveRecord(userId, classInfo) {
      const date = classInfo.date.toDate();
      const stamp = `${date.getFullYear()}/${date.getMonth() + 1}`;
      return firestore
        .collection('leaveRecord')
        .doc(userId)
        .update({
          reschedulable: firebase.firestore.FieldValue.arrayUnion(date),
          records: firebase.firestore.FieldValue.arrayUnion(date),
          stamps: firebase.firestore.FieldValue.arrayUnion(stamp)
        });
    }

    const tasks = [
      updateUserDate(userId, classInfo),
      updateClassProfile(userId, classInfo),
      updateLeaveRecord(userId, classInfo)
    ];

    Promise.all(tasks)
      .then(() => {
        dispatch({ type: 'LOADED' });
        dispatch({ type: 'LEAVE_APPLICATION_SUCCESS' });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// reschedule
export const reschedulePending = (classId, userId, rescheduleDate) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    dispatch({ type: 'LOADING' });

    function updateClassProfile(classId, userId) {
      return firestore
        .collection('classProfile')
        .doc(classId)
        .update({
          pendingStudents: firebase.firestore.FieldValue.arrayUnion(userId)
        });
    }
    function updateLeaveRecord(classId, userId, rescheduleDate) {
      const pendingInfo = {
        leaveDate: rescheduleDate,
        pendingClassId: classId
      };

      return firestore
        .collection('leaveRecord')
        .doc(userId)
        .update({
          reschedulable: firebase.firestore.FieldValue.arrayRemove(
            rescheduleDate
          ),
          reschedulePending: firebase.firestore.FieldValue.arrayUnion(
            pendingInfo
          )
        });
    }

    const tasks = [
      updateClassProfile(classId, userId),
      updateLeaveRecord(classId, userId, rescheduleDate)
    ];

    Promise.all(tasks).then(() => {
      dispatch({ type: 'LOADED' });
      dispatch({ type: 'RESCHEDULE_PENDING_SUCCESS' });
    });
  };
};

export const rescheduleAdd = (classId, userId, rescheduleDate) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    dispatch({ type: 'LOADING' });

    function updateClassProfile(classId, userId) {
      return firestore
        .collection('classProfile')
        .doc(classId)
        .update({
          rescheduleStudents: firebase.firestore.FieldValue.arrayUnion(userId)
        });
    }
    function updateLeaveRecord(classId, userId, rescheduleDate) {
      const rescheduleInfo = {
        leaveDate: rescheduleDate,
        rescheduleClassId: classId
      };

      return firestore
        .collection('leaveRecord')
        .doc(userId)
        .update({
          reschedulable: firebase.firestore.FieldValue.arrayRemove(
            rescheduleDate
          ),
          rescheduled: firebase.firestore.FieldValue.arrayUnion(rescheduleInfo)
        });
    }

    const tasks = [
      updateClassProfile(classId, userId),
      updateLeaveRecord(classId, userId, rescheduleDate)
    ];

    Promise.all(tasks).then(() => {
      dispatch({ type: 'LOADED' });
      dispatch({ type: 'RESCHEDULE_ADD_SUCCESS' });
    });
  };
};

export const cancelReschedulePending = (userId, pendingClassId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    function updateLeaveRecord() {
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
              reschedulable: firebase.firestore.FieldValue.arrayUnion(leaveDate)
            });
        });
    }
    function updateClassProfile() {
      return firestore
        .collection('classProfile')
        .doc(pendingClassId)
        .update({
          pendingStudents: firebase.firestore.FieldValue.arrayRemove(userId)
        });
    }

    const tasks = [updateLeaveRecord(), updateClassProfile()];

    Promise.all(tasks);
  };
};

export const rescheduleQueryAccept = (userId, classId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    dispatch({ type: 'LOADING' });

    function updateClassProfile(userId, classId) {
      return firestore
        .collection('classProfile')
        .doc(classId)
        .get()
        .then(() => {
          return firestore
            .collection('classProfile')
            .doc(classId)
            .update({
              pendingStudents: firebase.firestore.FieldValue.arrayRemove(
                userId
              ),
              rescheduleStudents: firebase.firestore.FieldValue.arrayUnion(
                userId
              )
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
              rescheduled: firebase.firestore.FieldValue.arrayUnion(
                rescheduleInfo
              ),
              reschedulePending: firebase.firestore.FieldValue.arrayRemove(
                reschedulePendingInfo
              )
            });
        });
    }

    const tasks = [
      updateClassProfile(userId, classId),
      updateLeaveRecord(userId, classId)
    ];

    Promise.all(tasks)
      .then(() => {
        dispatch({ type: 'LOADED' });
        console.log('success');
      })
      .catch((err) => {
        dispatch({ type: 'LOADED' });
        console.log(err);
      });
  };
};

export const rescheduleQueryDecline = (userId, classId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    dispatch({ type: 'LOADING' });

    function updateClassProfile(userId, classId) {
      return firestore
        .collection('classProfile')
        .doc(classId)
        .get()
        .then(() => {
          return firestore
            .collection('classProfile')
            .doc(classId)
            .update({
              pendingStudents: firebase.firestore.FieldValue.arrayRemove(userId)
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

    const tasks = [
      updateClassProfile(userId, classId),
      updateLeaveRecord(userId, classId)
    ];

    Promise.all(tasks)
      .then(() => {
        dispatch({ type: 'LOADED' });

        const sendQueryMail = firebase
          .functions()
          .httpsCallable('rescheduleQuery');
        return firestore
          .collection('classProfile')
          .doc(classId)
          .get()
          .then((snap) => {
            const data = snap.data();
            const targetStudent = data.pendingStudents[0];

            if (targetStudent) {
              sendQueryMail({
                studentId: targetStudent,
                classId: classId
              });
            }
          });
      })
      .catch((err) => {
        dispatch({ type: 'LOADED' });
        console.log(err);
      });
  };
};
