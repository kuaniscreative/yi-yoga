export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            document.location.href = "/";
            dispatch({type: 'LOGIN_SUCCESS'});
            dispatch({type: "LOADED"});
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR', err})
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        
        firebase.auth().signOut().then(() => {
            console.log('sign out')
        });
    }
}

export const signUp = (userInfo) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            userInfo.email,
            userInfo.password
        ).then((res) => {
            dispatch({type:'LOADED'});
            const uid = res.user.uid
            function updateLeaceRecord(uid) {
                return firestore.collection('leaveRecord').doc(uid).set({
                    records:[],
                    reschedulable: [],
                    reschedulePending: [],
                    rescheduled: [],
                    stamps: []
                })
            }
            function addUserInfo(uid) {
                return firestore.collection('user').doc(res.user.uid).set({
                    name: userInfo.name || null,
                    nickName: userInfo.nickName || null,
                    email: userInfo.email || null
                })
            }
            const tasks = [updateLeaceRecord(uid), addUserInfo(uid)];
            
            return Promise.all(tasks);
        })
        .catch((err) => {
            dispatch({type: 'LOADED'});
            dispatch({type: "SIGNUP_ERR", err})
            console.log(err);
        })
    }
}