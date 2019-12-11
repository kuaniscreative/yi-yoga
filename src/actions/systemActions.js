export const removeExpireClasses = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        /**
         *      取得classProfile並找出過期課堂
         */
        firestore
            .collection("classProfile")
            .get()
            .then(res => {
                const data = res.docs.map(snap => {
                    return {
                        ...snap.data(),
                        id: snap.id
                    };
                });
                const dueClasses = data.filter(classInfo => {
                    const date = classInfo.classDate.toDate();
                    return timeIsDue(date);
                });
                /**
                 *      非同步執行： 從classProfile移除 && 新增到classHistory
                 */
                function removeFromClassProfile(dueClasses) {
                    const tasks = [];
                    dueClasses.forEach(classInfo => {
                        const task = firestore
                            .collection("classProfile")
                            .doc(classInfo.id)
                            .delete();
                        tasks.push(task);
                    });
                    return Promise.all(tasks);
                }

                function createClassHistory(dueClasses) {
                    const tasks = [];
                    dueClasses.forEach(classInfo => {
                        const task = firestore
                            .collection("classHistory")
                            .doc(classInfo.id)
                            .set({
                                ...classInfo
                            });
                        tasks.push(task);
                    });
                    return Promise.all(tasks);
                }
                if (dueClasses.length) {
                    const tasks = [
                        removeFromClassProfile(dueClasses),
                        createClassHistory(dueClasses)
                    ];

                    return Promise.all(tasks);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
};

export const timeIsDue = date => {
    const currentTime = new Date();
    return date - currentTime < 0;
};

// export const getDueDates = (dates) => {
//     const dueDates = [];
//     let i = 0;
//     while (timeIsDue(dates[i]) ) {
//         dueDates.push(dates[i]);
//         i++
//     }
//     return dueDates
// }
