import firebase from '../fbConfig';
import { uniqBy } from 'lodash';
const firestore = firebase.firestore();

function addStudentsToClassProfile(studentInfos, classId) {
  const classProfile = firestore.collection('classProfile').doc(classId);

  return classProfile.get().then((res) => {
    const data = res.data();
    const { students: currentStudents } = data;
    const newStudents = uniqBy([...currentStudents, ...studentInfos], 'id');

    return classProfile.update({
      students: newStudents,
    });
  });
}

function updateStudentClasses(studentIds, classId) {
  function update(studentId) {
    return firestore
      .collection('user')
      .doc(studentId)
      .update({
        allClasses: firebase.firestore.FieldValue.arrayUnion(classId),
      });
  }

  const tasks = studentIds.map((studentId) => {
    return update(studentId);
  });

  return Promise.all(tasks);
}

export default function addStudentsToClass(studentInfos, classId) {
  const studentIds = studentInfos.map((info) => {
    return info.id;
  });

  const tasks = [
    addStudentsToClassProfile(studentInfos, classId),
    updateStudentClasses(studentIds, classId),
  ];

  return Promise.all(tasks);
}
