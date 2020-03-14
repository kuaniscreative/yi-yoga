import firebase from '../fbConfig';
const firestore = firebase.firestore();

/**
 *
 *      請假有三個任務要做
 *      1. 更新使用者資料
 *      2. 更新classProfile
 *          ---- 更新時要移動候補學生
 *      3. 更新leaveRecord
 *
 */

const sendQueryMail = firebase.functions().httpsCallable('rescheduleQuery');
const sendNotification = firebase
  .functions()
  .httpsCallable('rescheduleSuccessNotification');

function updateUserData(userId, classId) {
  return firestore
    .collection('user')
    .doc(userId)
    .update({
      allClasses: firebase.firestore.FieldValue.arrayRemove(classId),
      leave: firebase.firestore.FieldValue.arrayUnion(classId)
    });
}

function updateClassProfileSimple(requiredUserData, newStudents, classId) {
  return firestore
    .collection('classProfile')
    .doc(classId)
    .update({
      students: newStudents,
      absence: firebase.firestore.FieldValue.arrayUnion(requiredUserData)
    });
}

function rearrangeAllTypesOfStudents(
  requiredUserData,
  newStudents,
  newPendingStudents,
  newRescheduleStudents,
  classId
) {
  return firestore
    .collection('classProfile')
    .doc(classId)
    .update({
      pendingStudents: newPendingStudents,
      rescheduleStudents: newRescheduleStudents,
      students: newStudents,
      absence: firebase.firestore.FieldValue.arrayUnion(requiredUserData)
    });
}

function updateClassProfile(userInfo, classId, data) {
  const noPendingStudent = data.pendingStudents.length === 0;
  const currentTime = new Date();
  const classTime = data.date.toDate();
  const classStartWithinTwoHour = classTime - currentTime < 7200000;
  const requiredUserData = {
    name: userInfo.name,
    nickName: userInfo.nickName,
    email: userInfo.email,
    id: userInfo.uid
  };

  if (noPendingStudent) {
    const newStudents = data.students.filter((studentInfo) => {
      return studentInfo.id !== userInfo.uid;
    });
    return updateClassProfileSimple(requiredUserData, newStudents, classId);
  }

  const mm = classTime.getMonth();
  const dd = classTime.getDate();
  const hr = classTime.getHours();
  const min = classTime.getMinutes();
  const dateString = `${mm + 1}月${dd}日`;
  const startAt = `${hr}:${min < 10 ? `0${min}` : min}`;
  if (classStartWithinTwoHour) {
    sendQueryMail({
      studentId: data.pendingStudents[0],
      classId: classId,
      dateString: dateString,
      startAt: startAt
    });
    const newStudents = data.students.filter((studentInfo) => {
      return studentInfo.id !== userInfo.uid;
    });

    return updateClassProfileSimple(requiredUserData, newStudents, classId);
  } else {
    sendNotification({
      studentId: data.pendingStudents[0],
      dateString: dateString,
      startAt: startAt
    });

    const newStudents = data.students.filter((studentInfo) => {
      return studentInfo.id !== userInfo.uid;
    });

    const newPendingStudents = data.pendingStudents.filter((studentInfo) => {
      return studentInfo.id !== userInfo.uid;
    });

    const newRescheduleStudents = data.rescheduleStudents.filter(
      (studentInfo) => {
        return studentInfo.id !== userInfo.uid;
      }
    );

    return rearrangeAllTypesOfStudents(
      requiredUserData,
      newStudents,
      newPendingStudents,
      newRescheduleStudents,
      classId
    );
  }
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

function getClassProfile(classId) {
  return firestore
    .collection('classProfile')
    .doc(classId)
    .get();
}

export function leaveApplication(userInfo, classId) {
  return getClassProfile(classId).then((res) => {
    const data = res.data();
    const tasks = [
      updateUserData(userInfo.uid, classId),
      updateLeaveRecord(userInfo.uid, data),
      updateClassProfile(userInfo, classId, data)
    ];

    return Promise.all(tasks);
  });
}
