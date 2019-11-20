import { getFirebase } from "react-redux-firebase";
import { getFirestore } from "redux-firestore";

// register classes
export const registerToCourse = (course, userId, courseName, amount) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        /**
         * 
         *      報名時有三個步驟：
         *      1. 更新user資料
         *      2. 將uid加入至classProfile當中
         *      3. 新增付款資料
         * 
         */
        dispatch({type: 'LOADING'});
        const tasks = [
            updateUserData(course, userId),
            addStudentToClasses(course, userId),
            updateCourseData(course, userId),
            addPaymentStatus(courseName, userId, amount).then((res) => {
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

function updateUserData(course, userId) {
    const firestore = getFirestore();
    return (
        /**
         *
         *  獲取使用者資訊
         *
         */
        firestore
            .collection("user")
            .doc(userId)
            .get()
            /**
             *
             *  then, 將報名課程加入ˇ用者資訊
             *
             */
            .then(res => {
                const userData = res.data();
                const currentClasses = userData.allClasses || [];
                // destruct courses and reconstruct to a new array of all classes
                let reconstruct = [];
                course.forEach(item => {
                    reconstruct = reconstruct.concat(item.classes);
                });
                // filter out the same value
                let newClasses = [...currentClasses, ...reconstruct];
                newClasses = newClasses.map(item => {
                    return item.toDate().valueOf();
                });
                const filterOutUsingSet = new Set(newClasses);
                newClasses = [...filterOutUsingSet].map(item => {
                    return new Date(item);
                });

                return firestore
                    .collection("user")
                    .doc(userId)
                    .update({
                        allClasses: newClasses,
                        registeredCourse: course
                    });
            })
    );
}

function addStudentToClasses(course, userId) {
    const firestore = getFirestore();
    const firebase = getFirebase();
    return firestore
        .collection("classProfile")
        .get()
        .then(res => {
            // store data in constants
            const classProfile = res.docs.map(snapshot => {
                return snapshot.data();
            });
            const classList = classProfile.map(obj => {
                return obj.classDate.toDate();
            });
            const ids = res.docs.map(snapshot => {
                return snapshot.id;
            });

            // destruct courses and reconstruct to a new array of all classes
            let reconstruct = [];
            course.forEach(item => {
                reconstruct = reconstruct.concat(item.classes);
            });
            reconstruct = reconstruct.map(timestamp => {
                return timestamp.toDate();
            });

            // select equal classes and register the students
            const classList_value = classList.map(date => {
                return date.valueOf();
            });
            const promisePending = [];
            reconstruct.forEach(studentDate => {
                const date_value = studentDate.valueOf();
                const indexAt = classList_value.indexOf(date_value);
                if (indexAt > -1) {
                    const classId = ids[indexAt];
                    const promise = firestore
                        .collection("classProfile")
                        .doc(classId)
                        .update({
                            students: firebase.firestore.FieldValue.arrayUnion(
                                userId
                            )
                        });
                    promisePending.push(promise);
                }
            });

            return Promise.all(promisePending);
        });
}

function addPaymentStatus(courseName, userId, amount) {
    const firestore = getFirestore();
    return firestore.collection("paymentStatus").add({
        amount: amount,
        method: null,
        owner: userId,
        session: courseName,
        moneyReceived: false,
        moneySent: false
    });
}

function updateCourseData(course, userId) {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const promiseTask = [];
    course.forEach((courseInfo) => {
        const task = firestore.collection('course').doc(courseInfo.id).update({
            registeredStudents: firebase.firestore.FieldValue.arrayUnion(userId)
        })
        promiseTask.push(task);
    })

    return Promise.all(promiseTask)
}

export const updatePaymentStatus = (paymentId, method, account, date) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
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
                                    classInfo.toDate().valueOf() !==
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
            return firestore.collection('leaveRecord').doc(userId).get().then((res) => {
                const data = res.data();
                const currentPending = data.reschedulePending;
                const newPending = currentPending.filter((profile) => {
                    return profile.pendingClassId !== pendingClassId
                })
                const leaveDate = currentPending.find((profile) => {
                    return profile.pendingClassId === pendingClassId
                }).leaveDate;
                
                return firestore.collection('leaveRecord').doc(userId).update({
                    reschedulePending: newPending,
                    reschedulable: firebase.firestore.FieldValue.arrayUnion(leaveDate)
                })
            })
        }
        function updateClassProfile() {
            return firestore.collection('classProfile').doc(pendingClassId).update({
                pendingStudents: firebase.firestore.FieldValue.arrayRemove(userId)
            })
        }

        const tasks = [updateLeaveRecord(), updateClassProfile()];

        Promise.all(tasks)
    }
}

