export const registerSession = sessionInfo => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        /**
         *  第一步： 將目前開放報名的課程關掉
         */
        firestore
            .collection("session")
            .where('open', '==', true)
            .get()
            .then((snap) => {
                const ids = snap.docs.map((snap) => {
                    return snap.id
                })
                const promiseTask = [];
                ids.forEach((id) => {
                    const task = firestore.collection("session").doc(id).update({
                        open: false
                    })
                    promiseTask.push(task);
                })

                return Promise.all(promiseTask);
            })
            /**
            *  第二步： 新增資料到session
            */
            .then(() => {
                const period = sessionInfo.period;
                let span;
                if (period.length === 2 && period[0].month === period[1].month && period[0].year === period[1].year) {
                    span = [`${period[0].month}/${period[0].year}`]
                } else {
                    span = period.map((obj) => {
                        return `${obj.month}/${obj.year}`
                    })
                }
                return firestore.collection('session').add({
                    name: sessionInfo.name,
                    span: span,
                    open: true
                })
            })
            /**
            *  第三步： 新增couse & classProfile的資料
            */
            .then((res) => {
                const classes = sessionInfo.classes;
                const sessionId = res.id;
                
                function addCourseProfile() {
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
                                registeredStudents: []
                            })
                            promiseTasks.push(task);
                        })
                        
                        return Promise.all(promiseTasks)
                    })
                }
                function addClassProfile() {
                    const promiseTasks = [];
                    /**
                     * 
                     *      新增classProfile
                     * 
                     */
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
                    return Promise.all(promiseTasks).then((res) => {
                        /**
                         * 
                         *      將新增完的資料寫入session
                         * 
                         */
                        const tasks = res.map((ref) => {
                            return ref.get().then((snap) => {
                                const id = snap.id;
                                const date = snap.data().classDate;
                                const data = {
                                    id: id,
                                    date: date
                                }
                                firestore.collection('session').doc(sessionId).update({
                                    classes: firebase.firestore.FieldValue.arrayUnion(data)
                                })
                            }) 
                        })

                        return Promise.all(tasks);
                    });
                }

                const promiseTasks = [addCourseProfile(), addClassProfile()]
                return Promise.all(promiseTasks)
            })
            .then(() => {
                alert("新的課程現在可以報名囉！");
                dispatch({ type: "ADDED_NEW_SESSION"});
            })
            .catch((err) => {
                console.log(err);
            })
    };
};

