import firebase from '../fbConfig';
const firestore = firebase.firestore();

const createSessionName = ({ start, end }) => {
  if (start.year !== end.year) {
    return `${start.year}年${start.month}月 - ${end.year}年${end.month}月`;
  }
  return `${start.year}年 ${start.month}月 - ${end.month}月`;
};

const createSpan = ({ start, end }) => {
  const startDate = new Date(start.year, start.month - 1);
  const endDate = new Date(end.year, end.month - 1);

  const span = [];
  while (endDate.valueOf() >= startDate.valueOf()) {
    const month = startDate.getMonth();
    const year = startDate.getFullYear();
    const tag = `${month + 1}/${year}`;
    span.push(tag);
    startDate.setMonth(month + 1);
  }

  return span;
};

function closeOpeningSession() {
  return firestore
    .collection('session')
    .where('open', '==', true)
    .get()
    .then((snap) => {
      const ids = snap.docs.map((snapshot) => {
        return snapshot.id;
      });
      const tasks = [];
      ids.forEach((id) => {
        const task = firestore
          .collection('session')
          .doc(id)
          .update({
            open: false
          });
        tasks.push(task);
      });

      return Promise.all(tasks);
    });
}

function addSessionToFirestore({ id, name, span, classes }) {
  return firestore
    .collection('session')
    .doc(id)
    .set({
      name: name,
      span: span,
      open: true,
      classes: classes
    });
}

function addClassProfile(classes, sessionId) {
  const tasks = [];
  classes.forEach((info) => {
    const task = firestore
      .collection('classProfile')
      .doc(info.id)
      .set({
        ...info,
        session: sessionId,
        absence: [],
        pendingStudents: [],
        rescheduleStudents: [],
        students: []
      });
    tasks.push(task);
  });

  return Promise.all(tasks);
}

export const addNewSession = (sessionSpan, classes) => {
  const name = createSessionName(sessionSpan);
  const id = generateId();
  const span = createSpan(sessionSpan);

  const sessionTask = () => {
    return closeOpeningSession().then(() => {
      return addSessionToFirestore({ name, id, span, classes });
    });
  };

  const classTask = () => {
    return addClassProfile(classes, id);
  };
  const tasks = [sessionTask(), classTask()];

  return Promise.all(tasks);
};

export const validateStudent = (id) => {
  return firestore
    .collection('user')
    .doc(id)
    .update({
      validated: true
    });
};

function generateId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}
