export const registerSession = (classes) => {
    return (dispatch, getState, {getFirestore, getFirebase}) => {
      const firestore = getFirestore();
      
      firestore.collection('newSession').doc('KZ6kC4qlTuG3Y4CG1uw6').set(classes)
        .then(() => {
          alert('新的課程現在可以報名囉！');
          dispatch({type: 'ADDED_NEW_SESSION', classes});
        }).catch((err) => {
          dispatch({type:'ERROR', err})
        });
    }
  }