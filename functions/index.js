const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const Email = require("email-templates");
const cors = require("cors")({ origin: true });
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const account = functions.config().gmail.account;
const password = functions.config().gmail.password;
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: account,
        pass: password
    }
});

//

// exports.sendEmail = functions.firestore
//     .document("classProfile/{classId}")
//     .onUpdate((snap, context) => {
//         const mailOptions = {
//             from: `yiyoga.official@gmail.com`,
//             to: "benben19911020@gmail.com",
//             subject: "contact form message",
//             html: `<h1>Order Confirmation</h1>
//                                 <p>
//                                    <b>Email: </b><br>
//                                 </p>`
//         };
//         return transporter.sendMail(mailOptions, (error, data) => {
//             if (error) {
//                 console.log("we got problems");
//                 console.log(error);
//                 return;
//             }
//             console.log("Sent!");
//             console.log(snap);
//             console.log(context);
//         });
//     });

// exports.test = functions.https.onRequest((req, res) => {
//     return admin
//         .firestore()
//         .collection("classProfile")
//         .doc("0JAqfaVllMOwluFbSvtG")
//         .get()
//         .then(snap => {
//             console.log("did it");
//             console.log(snap);
//             res.send("test");
//         })
//         .catch(err => {
//             res.send(err);
//         });
// });

// function sendRescheduleEmail(userId) {
//     const mailOptions = {
//         from: `yiyoga.official@gmail.com`,
//         to: "benben19911020@gmail.com",
//         subject: "contact form message",
//         html: `<h1>Order Confirmation</h1>`
//     };
//     return transporter.sendMail(mailOptions, (error, data) => {
//         if (error) {
//             console.log("we got problems");
//             console.log(error);
//             return;
//             console.log("Sent!");
//         }
//     });

// }

// exports.rescheduleSuccessNotification = functions.firestore
//     .document("classProfile/{classId}")
//     .onUpdate((change, context) => {
//         const classId = context.params.classId;
//         const data = change.after.data();
//         const dataBefore = change.before.data();
//         const pendingStudentArranged =
//             dataBefore.pendingStudents.length > data.pendingStudents.length;
//         const targetStudent = data.rescheduleStudents.find(student => {
//             return (
//                 dataBefore.pendingStudents.indexOf(student) > -1 &&
//                 dataBefore.rescheduleStudents.indexOf(student) < 0
//             );
//         });
//         const currentTime = new Date();
//         const classTime = data.classDate.toDate();
//         const classStartInTwoHour = classTime - currentTime < 7200000;

//         if (pendingStudentArranged) {
//             admin
//                 .firestore()
//                 .collection("user")
//                 .doc(targetStudent)
//                 .get()
//                 .then(snap => {
//                     const userInfo = snap.data();
//                     const email = userInfo.email;
//                     const mailOptions = {
//                         from: "yiyoga.official@gmail.com",
//                         to: email,
//                         subject: "補課通知",
//                         html: `<p style="font-size: 16px;">補課成功囉！</p>`
//                     };

//                     return transporter.sendMail(mailOptions, (error, data) => {
//                         if (error) {
//                             console.log(error);
//                             return;
//                         }
//                     });
//                 });
//         }

//         return true
//     });

exports.rescheduleSuccessNotification = functions.https.onCall(
    (data, context) => {
        return admin
            .firestore()
            .collection("user")
            .doc(data.studentId)
            .get()
            .then(snap => {
                const userInfo = snap.data();
                const email = userInfo.email;
                const mailOptions = {
                    from: "yiyoga.official@gmail.com",
                    to: email,
                    subject: "補課通知",
                    html: `<p style="font-size: 16px;">補課成功囉！</p>`
                };

                return transporter.sendMail(mailOptions, (error, data) => {
                    if (error) {
                        console.log(error);
                        return;
                    }
                });
            });
    }
);

exports.rescheduleQuery = functions.https.onCall((data, context) => {
    return admin
        .firestore()
        .collection("user")
        .doc(data.studentId)
        .get()
        .then(snap => {
            const userInfo = snap.data();
            const email = userInfo.email;
            const classId = data.classId;
            const userId = data.studentId;
            const mailOptions = {
                from: "yiyoga.official@gmail.com",
                to: email,
                subject: "補課通知",
                html: /*html*/ `
                <p style="font-size: 16px;">請問是否要補課？</p> 
                <a href='https://class-manage-80e60.firebaseapp.com/#/rescheduleQuery/accept/${userId}/${classId}'>是</a> 
                <a href='https://class-manage-80e60.firebaseapp.com/#/rescheduleQuery/decline/${userId}/${classId}'>否</a>
                `
            };

            return transporter.sendMail(mailOptions, (error, data) => {
                if (error) {
                    console.log(error);
                    return;
                }
            });
        });
});

exports.testMail = functions.https.onCall((data, context) => {
    // const mailOptions = {
    //     from: "yiyoga.official@gmail.com",
    //     to: "benben19911020@gmail.com",
    //     subject: "補課通知",
    //     html: /*html*/ `
    //             <p style="font-size: 16px;">請問是否要補課？</p> 
    //             <a href='https://class-manage-80e60.firebaseapp.com/#/rescheduleQuery/accept/${userId}/${classId}'>是</a> 
    //             <a href='https://class-manage-80e60.firebaseapp.com/#/rescheduleQuery/decline/${userId}/${classId}'>否</a>
    //             `
    // };

    const email = new Email({
        message: {
            from: "芝伊瑜珈 <yiyoga.official@gmail.com>"
        },
        // uncomment below to send emails in development/test env:
        send: true,
        transport: {
            service: "gmail",
            auth: {
                user: account,
                pass: password
            }
        }
    });

    email.send({
        template: 'reschedule',
        message: {
            to: "benben19911020@gmail.com"
        },
        locals: {
            name: "凱婷",
            date: '2月15日',
            time: '19:30',
            acceptLink: 'https://class-manage-80e60.firebaseapp.com/#/',
            declineLink:'https://class-manage-80e60.firebaseapp.com/#/'
        }
    });
});
