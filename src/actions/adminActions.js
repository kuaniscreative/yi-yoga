export const registerSession = sessionInfo => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();

        firestore
            .collection("session")
            .add({
                name: sessionInfo.name,
                classes: sessionInfo.classes,
                open: true
            })
            .then((res) => {
                const classes = sessionInfo.classes;
                const sessionId = res.id;
                
                function addCouseProfile() {
                    return firestore.collection('regularCourse').get().then((snap) => {
                        const data = snap.docs.map((doc) => {
                            return doc.data();
                        });
                        const promiseTasks = []
    
                        data.forEach((regularCourse) => {
                            const matchClasses = classes.filter((classDate) => {
                                const classDay = classDate.getDay();
                                const classHour = classDate.getHours();
                                const regularCourseDay = regularCourse.reference.toDate().getDay();
                                const regularCourseHour = regularCourse.reference.toDate().getHours();
                                return classDay === regularCourseDay && classHour === regularCourseHour
                            }) 
                            const task = firestore.collection('course').add({
                                session: sessionId,
                                classes: matchClasses,
                                name: regularCourse.name,
                            })
                            promiseTasks.push(task);
                        })
                        
                        return Promise.all(promiseTasks)
                    })
                }
                function addClassProfile() {
                    const promiseTasks = [];
                    sessionInfo.classes.forEach((classDate) => {
                        const task = firestore.collection("classProfile").add({
                            classDate: classDate,
                            absence: [],
                            pendingStudents: [],
                            rescheduleStudents: [],
                            students: []
                        });
                        promiseTasks.push(task);
                    })
                    return Promise.all(promiseTasks);
                }

                const promiseTasks = [addCouseProfile(), addClassProfile()]
                return Promise.all(promiseTasks);
            })
            .then(() => {
                alert("新的課程現在可以報名囉！");
                dispatch({ type: "ADDED_NEW_SESSION"});
            })
    };
};

