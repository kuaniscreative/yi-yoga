export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            document.location.href = "/";
            dispatch({type: 'LOGIN_SUCCESS'})
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
            firestore.collection('leaveRecord').doc(res.user.uid).set({
                records:[],
                reschedulable: [],
                rescheduled: [],
                stamps: []
            })
            
            return firestore.collection('user').doc(res.user.uid).set({
                name: userInfo.name || null,
                nickName: userInfo.nickName || null,
                email: userInfo.email || null
            })
        })
    }
}