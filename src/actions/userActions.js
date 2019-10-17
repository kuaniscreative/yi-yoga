export const registerToCourse = (course, userId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {

        const firestore = getFirestore();

        firestore.collection('user').doc(userId).get().then((res) => {
            const userData = res.data();
            const allClasses = userData.allClasses || []
            // destruct courses and reconstruct to a new array of all classes
            let newClasses = [];
            course.forEach((item) => {
                newClasses = newClasses.concat(item.classes);
            })

            firestore.collection('user').doc(userId).update({
                allClasses: [...allClasses, ...newClasses],
                registeredCourse: course
            }).then(() => {
                // alert('報名成功');
                // document.location.href = '/';
                dispatch({type: 'REGISTERED_TO_COURSE', course});
            })
        })
    }
}