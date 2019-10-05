const initState = {

}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS': 
            return {
                ...state,
                userLoggedIn: true
            }
        default:
            return state
    }
}

export default authReducer