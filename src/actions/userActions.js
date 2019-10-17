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

export const addStudentToClasses = (course, userId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const firebase = getFirebase();

        firestore.collection('classProfile').get().then((res) => {
            // store data in constants
            const classProfile = res.docs.map((snapshot) => {
                return snapshot.data();
            })
            const classList = classProfile.map((obj) => {
                return obj.classDate.toDate()
            })
            const ids = res.docs.map((snapshot) => {
                return snapshot.id
            })

             // destruct courses and reconstruct to a new array of all classes
             let reconstruct = [];
             course.forEach((item) => {
                 reconstruct = reconstruct.concat(item.classes);
             })
             reconstruct = reconstruct.map((timestamp) => {
                return timestamp.toDate()
             })

             console.log(ids, classProfile, classList, reconstruct);
             // select equal classes and register the students
             const classList_value = classList.map((date) => {
                return date.valueOf()
             })
             reconstruct.forEach((studentDate) => {
                const date_value = studentDate.valueOf();
                const indexAt = classList_value.indexOf(date_value);
                if (indexAt > -1) {
                    const classId = ids[indexAt]
                    firestore.collection('classProfile').doc(classId).update({
                        students: firebase.firestore.FieldValue.arrayUnion(userId)
                    })
                } 
             })
            
        })


    }
}

export const leaveApplication = (date, userId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {

    }
}