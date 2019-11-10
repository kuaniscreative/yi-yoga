const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
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

// exports.sendMail = functions.https.onRequest((req, res) => {
//     // for gmail usage, you need to enable 2 step secure and generate specific password
//     // checkout: https://stackoverflow.com/a/49306726

//     // getting dest email by query string
//     const dest = req.query.dest;

//     const mailOptions = {
//         from: "yiyoga.official@gmail.com", // Something like: Jane Doe <janedoe@gmail.com>
//         to: "benben19911020@gmail.com",
//         subject: "I'M A PICKLE!!!", // email subject
//         html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
//                 <br />
//             ` // email content in HTML
//     };

//     // returning result
//     return transporter.sendMail(mailOptions, (erro, info) => {
//         if (erro) {
//             return res.send(erro.toString());
//         }
//         return res.send("Sended");
//     });
// });

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

exports.rescheduleSuccessNotification = functions.firestore
    .document("classProfile/{classId}")
    .onUpdate((change, context) => {
        const id = context.params.classId;
        const data = change.after.data()
        const before = chnge.before.data();
        const pendingStudents = data.pendingStudents;
        const pendingStudentArranged = before.pendingStudents.length > pendingStudents ? true : false;
        const user = data.rescheduleStudents.find((student) => {
            return before.pendingStudents.indexOf(student) > -1 && before.rescheduleStudents.indexOf(student) < 0
        })
        console.log(change.after.data(), id, `pending students is arranged: ${pendingStudentArranged}`, user);
        // if (pendingStudentArranged) {
        //     console.log('pending arranged!')
        //     console.log(user);
        //     return
        // } else {
        //     console.log('not working');
        //     return
        // }
        return true

    });
