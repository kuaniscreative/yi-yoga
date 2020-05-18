const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Email = require('email-templates');
admin.initializeApp(functions.config().firebase);

const account = functions.config().gmail.account;
const password = functions.config().gmail.password;

exports.rescheduleSuccessNotification = functions.https.onCall(
  (data, context) => {
    return admin
      .firestore()
      .collection('user')
      .doc(data.studentId)
      .get()
      .then((snap) => {
        const userInfo = snap.data();
        const userEmail = userInfo.email;
        const userName = userInfo.name;
        const email = new Email({
          message: {
            from: '芝伊瑜珈 <yiyoga.official@gmail.com>',
          },
          // uncomment below to send emails in development/test env:
          // send: true,
          transport: {
            service: 'gmail',
            auth: {
              user: account,
              pass: password,
            },
          },
        });

        return email.send({
          template: 'rescheduleSuccess',
          message: {
            to: userEmail,
          },
          locals: {
            name: userName,
            date: data.dateString,
            time: data.startAt,
          },
        });
      });
  }
);

exports.rescheduleQuery = functions.https.onCall((data, context) => {
  return admin
    .firestore()
    .collection('user')
    .doc(data.studentId)
    .get()
    .then((snap) => {
      const userInfo = snap.data();
      const userEmail = userInfo.email;
      const userName = userInfo.name;
      const classId = data.classId;
      const userId = data.studentId;
      const email = new Email({
        message: {
          from: '芝伊瑜珈 <yiyoga.official@gmail.com>',
        },
        // uncomment below to send emails in development/test env:
        // send: true,
        transport: {
          service: 'gmail',
          auth: {
            user: account,
            pass: password,
          },
        },
      });

      return email.send({
        template: 'rescheduleQuery',
        message: {
          to: userEmail,
        },
        locals: {
          name: userName,
          date: data.dateString,
          time: data.startAt,
          acceptLink: `https://class-manage-80e60.firebaseapp.com/rescheduleQuery/accept/${userId}/${classId}`,
          declineLink: `https://class-manage-80e60.firebaseapp.com/rescheduleQuery/decline/${userId}/${classId}`,
        },
      });
    });
});

exports.accountValidationSuccess = functions.firestore
  .document('user/{userId}')
  .onUpdate((change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    if (before.validated === false && after.validated === true) {
      const email = new Email({
        message: {
          from: '芝伊瑜珈 <yiyoga.official@gmail.com>',
        },
        // uncomment below to send emails in development/test env:
        // send: true,
        transport: {
          service: 'gmail',
          auth: {
            user: account,
            pass: password,
          },
        },
      });
      return email.send({
        template: 'accountValidationSuccess',
        message: {
          to: after.email,
        },
        locals: {
          name: after.name,
          url: 'https://class-manage-80e60.firebaseapp.com/',
        },
      });
    } else {
      return;
    }
  });

exports.sendNewStudentNotification = functions.firestore
  .document('user/{userId}')
  .onCreate((change, context) => {
    const email = new Email({
      message: {
        from: '芝伊瑜珈 <yiyoga.official@gmail.com>',
      },
      // uncomment below to send emails in development/test env:
      // send: true,
      transport: {
        service: 'gmail',
        auth: {
          user: account,
          pass: password,
        },
      },
    });
    return email.send({
      template: 'sendNewStudentNotification',
      message: {
        to: 'yiyoga.official@gmail.com',
      },
      locals: {
        url: 'https://class-manage-80e60.firebaseapp.com/',
      },
    });
  });

function updateClassProfile(
  classId,
  pendingStudent,
  pendingStudents,
  rescheduleStudents
) {
  const { id, name, nickName, email } = pendingStudent;
  const newPendingStudents = pendingStudents.filter((stu) => {
    return stu.id !== id;
  });
  const newRescheduleStudents = rescheduleStudents.slice(0);
  newRescheduleStudents.push({
    id,
    name,
    nickName,
    email,
  });
  return admin.firestore().collection('classProfile').doc(classId).update({
    pendingStudents: newPendingStudents,
    rescheduleStudents: newRescheduleStudents,
  });
}

function updateLeaveRecord(pendingClassId, studentId) {
  return admin
    .firestore()
    .collection('leaveRecord')
    .doc(studentId)
    .get()
    .then((snap) => {
      const record = snap.data();
      const target = record.reschedulePending.find((item) => {
        return item.pendingClassId === pendingClassId;
      });
      const newReschedulePending = record.reschedulePending.filter((item) => {
        return item.pendingClassId !== pendingClassId;
      });
      const newRescheduled = record.rescheduled;
      newRescheduled.push({
        leaveDate: target.leaveDate,
        rescheduleClassId: pendingClassId,
      });

      return admin.firestore().collection('leaveRecord').doc(studentId).update({
        reschedulePending: newReschedulePending,
        rescheduled: newRescheduled,
      });
    });
}

exports.movePendingStudnet = functions.firestore
  .document('classProfile/{classId}')
  .onUpdate((change, context) => {
    const classId = context.params.classId;
    const after = change.after.data();
    const isAvailable =
      after.opacity > after.students.length + after.rescheduleStudents.length;
    const hasPendingStudent = !!after.pendingStudents.length;
    if (isAvailable && hasPendingStudent) {
      const currentTime = new Date();
      const classTime = after.date.toDate();
      const classStartWithinTwoHour = classTime - currentTime < 7200000;
      const pendingStudent = after.pendingStudents[0];
      if (classStartWithinTwoHour) {
        return functions.firestore.sendQueryMail({
          studentId: pendingStudent.id,
          classId: classId,
          dateString: after.name,
          startAt: after.type,
        });
      } else {
        const tasks = [
          updateClassProfile(
            classId,
            pendingStudent,
            after.pendingStudents,
            after.rescheduleStudents
          ),
          updateLeaveRecord(classId, pendingStudent.id),
        ];
        return Promise.all(tasks).then(() => {
          const email = new Email({
            message: {
              from: '芝伊瑜珈 <yiyoga.official@gmail.com>',
            },
            // uncomment below to send emails in development/test env:
            // send: true,
            transport: {
              service: 'gmail',
              auth: {
                user: account,
                pass: password,
              },
            },
          });

          return email.send({
            template: 'rescheduleSuccess',
            message: {
              to: pendingStudent.email,
            },
            locals: {
              name: pendingStudent.name,
              date: after.name,
              time: after.type,
            },
          });
        });
      }
    }
    return;
  });
