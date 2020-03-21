import firebase from '../fbConfig';
const firestore = firebase.firestore();

function updateClassProfile(classId, userInfo) {
  const { name, nickName, email, id } = userInfo;
  return firestore
    .collection('classProfile')
    .doc(classId)
    .update({
      rescheduleStudents: firebase.firestore.FieldValue.arrayUnion({
        name,
        nickName,
        email,
        id
      })
    });
}
function updateLeaveRecord(classId, userId, leaveClassDate) {
  const rescheduleInfo = {
    leaveDate: leaveClassDate,
    rescheduleClassId: classId
  };

  return firestore
    .collection('leaveRecord')
    .doc(userId)
    .update({
      reschedulable: firebase.firestore.FieldValue.arrayRemove(leaveClassDate),
      rescheduled: firebase.firestore.FieldValue.arrayUnion(rescheduleInfo)
    });
}

export default function rescheduleAdd(classId, userInfo, leaveClassDate) {
  const tasks = [
    updateClassProfile(classId, userInfo),
    updateLeaveRecord(classId, userInfo.id, leaveClassDate)
  ];

  return Promise.all(tasks);
}
