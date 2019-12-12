const initState = {

}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS': 
            return {
                ...state,
                userLoggedIn: true
            }
        case 'SIGNUP_ERR':
            function messageOutput(err) {
                switch(err.code) {
                    case 'auth/email-already-in-use':
                        return '帳號重複';
                    case 'auth/invalid-email':
                        return '請輸入正確信箱';
                    default:
                        return err.message
                }
            }
            alert(messageOutput(action.err));
            return {
                ...state,
                errMessage: action.err
            }
        default:
            return state
    }
}

export default authReducer