// register classes
export const registerToCourse = (course, userId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        firestore
            .collection("user")
            .doc(userId)
            .get()
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

                firestore
                    .collection("user")
                    .doc(userId)
                    .update({
                        allClasses: newClasses,
                        registeredCourse: course
                    })
                    .then(() => {
                        dispatch({ type: "REGISTERED_TO_COURSE", course });
                    });
            });
    };
};

export const addStudentToClasses = (course, userId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();

        firestore
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
                reconstruct.forEach(studentDate => {
                    const date_value = studentDate.valueOf();
                    const indexAt = classList_value.indexOf(date_value);
                    if (indexAt > -1) {
                        const classId = ids[indexAt];
                        firestore
                            .collection("classProfile")
                            .doc(classId)
                            .update({
                                students: firebase.firestore.FieldValue.arrayUnion(
                                    userId
                                )
                            });
                    }
                });
            });
    };
};

export const updateRegisterStatus = (courseName, sessionId, userId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const registerStatus = firestore.collection("registerStatus");

        registerStatus
            .where("name", "==", courseName)
            .where("session", "==", sessionId)
            .get()
            .then(snapshot => {
                const match = snapshot.docs;
                match.forEach(ref => {
                    
                    if (ref.data().students.length === 14) {
                        registerStatus.doc(ref.id).update({
                            students:firebase.firestore.FieldValue.arrayUnion(userId),
                            full: true
                        })
                    } else {
                        registerStatus.doc(ref.id).update({
                            students:firebase.firestore.FieldValue.arrayUnion(userId),
                        })
                    }
                });
            });
    };
};

// leave application
export const updateLeaveRecord_leave = (date, userId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const stamp = `${date.getFullYear()}/${date.getMonth() + 1}`;

        firestore.collection('leaveRecord').doc(userId).update({
            reschedulable: firebase.firestore.FieldValue.arrayUnion(date),
            records: firebase.firestore.FieldValue.arrayUnion(date),
            stamps: firebase.firestore.FieldValue.arrayUnion(stamp)
        }).then(() => {
            console.log('updated user leaveRecord when leave application')
        })
    }
}

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
                dispatch({type: "LEAVE_APPLICATION_SUCCESS"})
            });
    };
};

export const addPendingStudentToClass = (classId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firestore.collection('classProfile').doc(classId).get().then((snapshot) => {
            const classInfo = snapshot.data();
            const studentId = classInfo.pendingStudents ? classInfo.pendingStudents[0] : undefined;
            const available = classInfo.students.length + classInfo.rescheduleStudents.length < 16;

            if (classInfo.pendingStudents.length > 0 && available) {
                return firestore.collection('classProfile').doc(classId).update({
                    pendingStudents: firebase.firestore.FieldValue.arrayRemove(studentId),
                    rescheduleStudents: firebase.firestore.FieldValue.arrayUnion(studentId)
                }).then(() => {
                    console.log(classId);
                })
            } else {
                console.log('no students to add')
            }
        })
    }
}

// reschedule
export const reschedulePending = (classId, userId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();

        firestore
            .collection("classProfile")
            .doc(classId)
            .update({
                pendingStudent: firebase.firestore.FieldValue.arrayUnion(userId)
            })
            .then(() => {
                dispatch({type: 'RESCHEDULE_PENDING_SUCCESS'})
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
                rescheduleStudent: firebase.firestore.FieldValue.arrayUnion(userId)
            })
            .then(() => {
                dispatch({type: 'RESCHEDULE_ADD_SUCCESS'})
            });
    };
};

export const updateLeaveRecord_reschedule = (userId, rescheduleDate) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();

        firestore
            .collection("leaveRecord")
            .doc(userId)
            .update({
                reschedulable: firebase.firestore.FieldValue.arrayRemove(rescheduleDate),
                rescheduled: firebase.firestore.FieldValue.arrayUnion(rescheduleDate)
            })
            .then(() => {
                // alert("已候捕");
                // document.location.href = "/";
            });
    };
};
