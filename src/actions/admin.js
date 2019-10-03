export const addSession = (classes) => {
    return (dispatch, getState, {getFirestore, getFirebase}) => {
      const firestore = getFirestore();
      firestore.collection('sessions').add({
        ...classes
      }).then(() => {
        dispatch({type: 'ADD_SESSION', classes});
      }).catch((err) => {
        dispatch({type:'ERROR', err})
      });
      
    }
  }