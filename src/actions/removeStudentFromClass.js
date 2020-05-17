import firebase from '../fbConfig';
const firestore = firebase.firestore();

function removeStudentFromClassProfile(studentId, classId) {
  return firestore
    .collection('classProfile')
    .doc(classId)
    .get()
    .then((res) => {
      const data = res.data();
      const { students } = data;
      const newStudents = students.filter((student) => {
        return student.id !== studentId;
      });

      return firestore.collection('classProfile').doc(classId).update({
        students: newStudents,
      });
    });
}
function rmeoveClassFromUser(studentId, classId, shouldGiveFreeClass) {
  return firestore
    .collection('user')
    .doc(studentId)
    .update({
      allClasses: firebase.firestore.FieldValue.arrayRemove(classId),
      freeClasses: firebase.firestore.FieldValue.increment(
        shouldGiveFreeClass ? 1 : 0
      ),
    });
}

export default function removeStudentFromClass(
  studentId,
  classId,
  shouldGiveFreeClass
) {
  const tasks = [
    rmeoveClassFromUser(studentId, classId, shouldGiveFreeClass),
    removeStudentFromClassProfile(studentId, classId),
  ];

  return Promise.all(tasks);
}
