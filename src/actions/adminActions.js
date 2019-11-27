export const registerSession = sessionInfo => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        dispatch({ type: "LOADING" });
        const firestore = getFirestore();

        const classInfos = sessionInfo.classInfos.map(info => {
            return {
                ...info,
                id: generateId()
            };
        });
        const sessionId = generateId();

        function createNewSession(givenId) {
            /**
             * 
             *      第一步是先取得當前開放中的課程，之後同時進行：    
             *      1. addSession
             *      2. 關掉當前開放的課程
             * 
             */
            const period = sessionInfo.period;
            let span;
            if (
                period.length === 2 &&
                period[0].month === period[1].month &&
                period[0].year === period[1].year
            ) {
                span = [`${period[0].month}/${period[0].year}`];
            } else {
                span = period.map(obj => {
                    return `${obj.month}/${obj.year}`;
                });
            }

            const addSession = (givenId) => {
                return firestore
                    .collection("session")
                    .doc(givenId)
                    .set({
                        name: sessionInfo.name,
                        span: span,
                        open: true,
                        classes: classInfos
                    });
            };
            /**
             *      第一步： 取得當前開放的課程
             */
            return firestore
                .collection("session")
                .where("open", "==", true)
                .get()
                /**
                 *      第二步，新增課程以及關掉當前開放報名的課程
                 */
                .then(snap => {
                    const ids = snap.docs.map(snap => {
                        return snap.id;
                    });
                    const promiseTask = [addSession(givenId)];
                    ids.forEach(id => {
                        const task = firestore
                            .collection("session")
                            .doc(id)
                            .update({
                                open: false
                            });
                        promiseTask.push(task);
                    });

                    return Promise.all(promiseTask);
                });
        }

        function addClassProfile(classInfos, sessionId) {
            const tasks = [];

            classInfos.forEach(info => {
                const task = firestore
                    .collection("classProfile")
                    .doc(info.id)
                    .set({
                        classDate: info.date,
                        capacity: info.capacity,
                        name: info.name,
                        session: sessionId,
                        absence: [],
                        pendingStudents: [],
                        rescheduleStudents: [],
                        students: []
                    });
                tasks.push(task);
            });

            return Promise.all(tasks);
        }

        const tasks = [
            createNewSession(sessionId),
            addClassProfile(classInfos, sessionId)
        ];

        Promise.all(tasks)
            .then(() => {
                alert("新的課程現在可以報名囉！");
                dispatch({ type: "LOADED" });
                dispatch({ type: "ADDED_NEW_SESSION" });
            })
            .catch(err => {
                console.log(err);
            });
    };
};

function generateId() {
    return Math.random()
        .toString(36)
        .substr(2, 9);
}
