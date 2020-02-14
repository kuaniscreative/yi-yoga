const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const Email = require('email-templates');
const cors = require('cors')({ origin: true });
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
            from: '芝伊瑜珈 <yiyoga.official@gmail.com>'
          },
          // uncomment below to send emails in development/test env:
          // send: true,
          transport: {
            service: 'gmail',
            auth: {
              user: account,
              pass: password
            }
          }
        });

        return email.send({
          template: 'rescheduleSuccess',
          message: {
            to: userEmail
          },
          locals: {
            name: userName,
            date: data.dateString,
            time: data.startAt
          }
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
          from: '芝伊瑜珈 <yiyoga.official@gmail.com>'
        },
        // uncomment below to send emails in development/test env:
        // send: true,
        transport: {
          service: 'gmail',
          auth: {
            user: account,
            pass: password
          }
        }
      });

      return email.send({
        template: 'rescheduleQuery',
        message: {
          to: userEmail
        },
        locals: {
          name: userName,
          date: data.dateString,
          time: data.startAt,
          acceptLink: `https://class-manage-80e60.firebaseapp.com/#/rescheduleQuery/accept/${userId}/${classId}`,
          declineLink: `https://class-manage-80e60.firebaseapp.com/#/rescheduleQuery/decline/${userId}/${classId}`
        }
      });
    });
});

// exports.accountValidationSuccess = functions.https.onCall(
//   (userInfo, context) => {
//     const email = new Email({
//       message: {
//         from: '芝伊瑜珈 <yiyoga.official@gmail.com>'
//       },
//       // uncomment below to send emails in development/test env:
//       // send: true,
//       transport: {
//         service: 'gmail',
//         auth: {
//           user: account,
//           pass: password
//         }
//       }
//     });
//     return email.send({
//       template: 'accountValidationSuccess',
//       message: {
//         to: userInfo.email
//       },
//       locals: {
//         name: userInfo.name,
//         url: 'https://class-manage-80e60.firebaseapp.com/'
//       }
//     });
//   }
// );

exports.accountValidationSuccess = functions.firestore
  .document('user/{userId}')
  .onUpdate((change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    if (before.validated === false && after.validated === true) {
      const email = new Email({
        message: {
          from: '芝伊瑜珈 <yiyoga.official@gmail.com>'
        },
        // uncomment below to send emails in development/test env:
        // send: true,
        transport: {
          service: 'gmail',
          auth: {
            user: account,
            pass: password
          }
        }
      });
      return email.send({
        template: 'accountValidationSuccess',
        message: {
          to: after.email
        },
        locals: {
          name: after.name,
          url: 'https://class-manage-80e60.firebaseapp.com/'
        }
      });
    } else {
      return;
    }
  });

// exports.sendNewStudentNotification = functions.https.onCall(() => {
//   const email = new Email({
//     message: {
//       from: '芝伊瑜珈 <yiyoga.official@gmail.com>'
//     },
//     // uncomment below to send emails in development/test env:
//     // send: true,
//     transport: {
//       service: 'gmail',
//       auth: {
//         user: account,
//         pass: password
//       }
//     }
//   });
//   return email.send({
//     template: 'sendNewStudentNotification',
//     message: {
//       to: 'kuan.thisis@gmail.com'
//     },
//     locals: {
//       url: 'https://class-manage-80e60.firebaseapp.com/'
//     }
//   });
// });

exports.sendNewStudentNotification = functions.firestore
  .document('user/{userId}')
  .onCreate((change, context) => {
    const email = new Email({
      message: {
        from: '芝伊瑜珈 <yiyoga.official@gmail.com>'
      },
      // uncomment below to send emails in development/test env:
      // send: true,
      transport: {
        service: 'gmail',
        auth: {
          user: account,
          pass: password
        }
      }
    });
    return email.send({
      template: 'sendNewStudentNotification',
      message: {
        to: 'yiyoga.official@gmail.com'
      },
      locals: {
        url: 'https://class-manage-80e60.firebaseapp.com/'
      }
    });
  });
