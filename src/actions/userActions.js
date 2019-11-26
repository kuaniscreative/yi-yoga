// register classes
export const registerToCourse = (classes, userId, sessionName, sessionId, amount) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        dispatch({ type: "LOADING" });

        /**
         *
         *      報名時有三個步驟：
         *      1. 更新user資料
         *      2. 將uid加入至classProfile當中
         *      3. 新增付款資料
         *
         */
        function updateUserData(classes, userId) {
            return firestore
                .collection("user")
                .doc(userId)
                .update({
                    allClasses: firebase.firestore.FieldValue.arrayUnion(
                        ...classes
                    )
                });
        }

        function addStudentToClasses(classInfos, userId) {
            const ids = classInfos.map((info) => {
                return info.id
            })
            const tasks = []
            ids.forEach((id) => {
                const task = firestore.collection('classProfile').doc(id).update({
                    students: firebase.firestore.FieldValue.arrayUnion(userId)
                })
                tasks.push(task)
            })

            return Promise.all(tasks)

        }

        function addPaymentStatus(userId, sessionName, sessionId, amount) {
            return firestore.collection("paymentStatus").add({
                amount: amount,
                method: null,
                owner: userId,
                sessionName: sessionName,
                sessionId:  sessionId,
                moneyReceived: false,
                moneySent: false
            });
        }

        const tasks = [
            updateUserData(classes, userId),
            addStudentToClasses(classes, userId),
            addPaymentStatus(userId, sessionName, sessionId, amount).then((res) => {
                dispatch({type: 'ADD_PAYMENT_SUCCESS', id: res.id})
            })
        ];

        Promise.all(tasks)
            .then(() => {
                dispatch({type: 'REGISTERED_TO_COURSE'});
                dispatch({type: 'LOADED'});
            })
            .catch(err => {
                console.log(err);
            });
    };
};


export const updatePaymentStatus = (paymentId, method, account, date) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        firestore
            .collection("paymentStatus")
            .doc(paymentId)
            .update({
                method: method,
                account: account,
                date: date,
                moneySent: true
            })
            .then(() => {
                dispatch({ type: "UPDATE_PAYMENT_SUCCESS" });
            })
            .catch(err => {
                console.log(err);
            });
    };
};

// leave application
export const updateLeaveRecord_leave = (date, userId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const stamp = `${date.getFullYear()}/${date.getMonth() + 1}`;

        firestore
            .collection("leaveRecord")
            .doc(userId)
            .update({
                reschedulable: firebase.firestore.FieldValue.arrayUnion(date),
                records: firebase.firestore.FieldValue.arrayUnion(date),
                stamps: firebase.firestore.FieldValue.arrayUnion(stamp)
            })
            .then(() => {
                console.log("updated user leaveRecord when leave application");
            });
    };
};

export const leaveApplication = (selectedDate, userId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firestore
            .collection("classProfile")
            .get()
            .then(snapshot => {
                const classProfiles = snapshot.docs.map(item => {
                    return item.data();
                });
                const match = classProfiles.find(profile => {
                    return (
                        profile.classDate.toDate().valueOf() ===
                        selectedDate.toDate().valueOf()
                    );
                });
                const matchPosition = classProfiles.indexOf(match);
                const matchId = snapshot.docs[matchPosition].id;

                // 將學生id從classProfile.students中移除，並紀錄在classProfile.absence中
                firestore
                    .collection("classProfile")
                    .doc(matchId)
                    .update({
                        students: firebase.firestore.FieldValue.arrayRemove(
                            userId
                        ),
                        absence: firebase.firestore.FieldValue.arrayUnion(
                            userId
                        )
                    });

                // 將請假的課堂從user.allClasses中移除
                firestore
                    .collection("user")
                    .doc(userId)
                    .get()
                    .then(snapshot => {
                        const userClasses = snapshot.data().allClasses;
                        const resultAfterLeave = userClasses.filter(
                            classInfo => {
                                return (
                                    classInfo.date.toDate().valueOf() !==
                                    selectedDate.toDate().valueOf()
                                );
                            }
                        );
                        const leaveRecord_year = selectedDate
                            .toDate()
                            .getFullYear();
                        const leaveRecord_month = selectedDate
                            .toDate()
                            .getMonth();
                        const record = `${leaveRecord_year}/${leaveRecord_month +
                            1}`;

                        firestore
                            .collection("user")
                            .doc(userId)
                            .update({
                                allClasses: resultAfterLeave,
                                leaveRecord: firebase.firestore.FieldValue.arrayUnion(
                                    record
                                ),
                                reschedulable: firebase.firestore.FieldValue.arrayUnion(
                                    record
                                )
                            });
                    });
            })
            .then(() => {
                dispatch({ type: "LEAVE_APPLICATION_SUCCESS" });
            });
    };
};

export const addPendingStudentToClass = classId => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firestore
            .collection("classProfile")
            .doc(classId)
            .get()
            .then(snapshot => {
                const classInfo = snapshot.data();
                const studentId = classInfo.pendingStudents
                    ? classInfo.pendingStudents[0]
                    : undefined;
                const available =
                    classInfo.students.length +
                        classInfo.rescheduleStudents.length <
                    16;

                if (classInfo.pendingStudents.length > 0 && available) {
                    return firestore
                        .collection("classProfile")
                        .doc(classId)
                        .update({
                            pendingStudents: firebase.firestore.FieldValue.arrayRemove(
                                studentId
                            ),
                            rescheduleStudents: firebase.firestore.FieldValue.arrayUnion(
                                studentId
                            )
                        })
                        .then(() => {
                            console.log(classId);
                        });
                } else {
                    console.log("no students to add");
                }
            });
    };
};

// reschedule
export const reschedulePending = (classId, userId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();

        firestore
            .collection("classProfile")
            .doc(classId)
            .update({
                pendingStudents: firebase.firestore.FieldValue.arrayUnion(
                    userId
                )
            })
            .then(() => {
                dispatch({ type: "RESCHEDULE_PENDING_SUCCESS" });
            });
    };
};

export const rescheduleAdd = (classId, userId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();

        firestore
            .collection("classProfile")
            .doc(classId)
            .update({
                rescheduleStudents: firebase.firestore.FieldValue.arrayUnion(
                    userId
                )
            })
            .then(() => {
                dispatch({ type: "RESCHEDULE_ADD_SUCCESS" });
            });
    };
};

export const updateLeaveRecord_rescheduleAdd = (
    userId,
    rescheduleDate,
    classId
) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();

        const rescheduleInfo = {
            leaveDate: rescheduleDate,
            rescheduleClassId: classId
        };

        firestore
            .collection("leaveRecord")
            .doc(userId)
            .update({
                reschedulable: firebase.firestore.FieldValue.arrayRemove(
                    rescheduleDate
                ),
                rescheduled: firebase.firestore.FieldValue.arrayUnion(
                    rescheduleInfo
                )
            });
    };
};

export const updateLeaveRecord_reschedulePending = (
    userId,
    rescheduleDate,
    classId
) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();

        const pendingInfo = {
            leaveDate: rescheduleDate,
            pendingClassId: classId
        };

        firestore
            .collection("leaveRecord")
            .doc(userId)
            .update({
                reschedulable: firebase.firestore.FieldValue.arrayRemove(
                    rescheduleDate
                ),
                reschedulePending: firebase.firestore.FieldValue.arrayUnion(
                    pendingInfo
                )
            });
    };
};

export const cancelReschedulePending = (userId, pendingClassId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        function updateLeaveRecord() {
            return firestore
                .collection("leaveRecord")
                .doc(userId)
                .get()
                .then(res => {
                    const data = res.data();
                    const currentPending = data.reschedulePending;
                    const newPending = currentPending.filter(profile => {
                        return profile.pendingClassId !== pendingClassId;
                    });
                    const leaveDate = currentPending.find(profile => {
                        return profile.pendingClassId === pendingClassId;
                    }).leaveDate;

                    return firestore
                        .collection("leaveRecord")
                        .doc(userId)
                        .update({
                            reschedulePending: newPending,
                            reschedulable: firebase.firestore.FieldValue.arrayUnion(
                                leaveDate
                            )
                        });
                });
        }
        function updateClassProfile() {
            return firestore
                .collection("classProfile")
                .doc(pendingClassId)
                .update({
                    pendingStudents: firebase.firestore.FieldValue.arrayRemove(
                        userId
                    )
                });
        }

        const tasks = [updateLeaveRecord(), updateClassProfile()];

        Promise.all(tasks);
    };
};
