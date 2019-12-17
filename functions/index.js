const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const Email = require("email-templates");
const cors = require("cors")({ origin: true });
admin.initializeApp(functions.config().firebase);

const account = functions.config().gmail.account;
const password = functions.config().gmail.password;

exports.rescheduleSuccessNotification = functions.https.onCall(
    (data, context) => {
        return admin
            .firestore()
            .collection("user")
            .doc(data.studentId)
            .get()
            .then(snap => {
                const userInfo = snap.data();
                const userEmail = userInfo.email;
                const userName = userInfo.name;
                const email = new Email({
                    message: {
                        from: "芝伊瑜珈 <yiyoga.official@gmail.com>"
                    },
                    // uncomment below to send emails in development/test env:
                    // send: true,
                    transport: {
                        service: "gmail",
                        auth: {
                            user: account,
                            pass: password
                        }
                    }
                });

                return email.send({
                    template: "rescheduleSuccess",
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
        .collection("user")
        .doc(data.studentId)
        .get()
        .then(snap => {
            const userInfo = snap.data();
            const userEmail = userInfo.email;
            const userName = userInfo.name;
            const classId = data.classId;
            const userId = data.studentId;
            const email = new Email({
                message: {
                    from: "芝伊瑜珈 <yiyoga.official@gmail.com>"
                },
                // uncomment below to send emails in development/test env:
                // send: true,
                transport: {
                    service: "gmail",
                    auth: {
                        user: account,
                        pass: password
                    }
                }
            });

            return email.send({
                template: "rescheduleQuery",
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

