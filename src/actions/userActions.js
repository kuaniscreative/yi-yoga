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
                        alert("報名成功");
                        document.location.href = "/";
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
                    })
                    
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
                        console.log(userClasses, resultAfterLeave);

                        firestore
                            .collection("user")
                            .doc(userId)
                            .update({
                                allClasses: resultAfterLeave
                            });
                    })
            }).then(() => {
                alert('請假成功');
                document.location.href = '/';
            });
    };
};
