export const registerToCourse = (course, userId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {

        const firestore = getFirestore();

        firestore.collection('user').doc(userId).get().then((res) => {
            const userData = res.data();
            const currentClasses = userData.allClasses || []
            // destruct courses and reconstruct to a new array of all classes
            let reconstruct = [];
            course.forEach((item) => {
                reconstruct = reconstruct.concat(item.classes);
            })
            // filter out the same value
            let newClasses = [...currentClasses, ...reconstruct];
            newClasses = newClasses.map((item) => {
                return item.toDate().valueOf();
            })
            const filterOutUsingSet = new Set(newClasses);
            newClasses = [...filterOutUsingSet].map((item) => {
                return new Date(item)
            })


            firestore.collection('user').doc(userId).update({
                allClasses: newClasses,
                registeredCourse: course
            }).then(() => {
                alert('報名成功');
                document.location.href = '/';
                dispatch({type: 'REGISTERED_TO_COURSE', course});
            })
        })
    }
}

export const leaveApplication = (date, userId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {

    }
}