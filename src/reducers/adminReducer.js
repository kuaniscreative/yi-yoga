const initState = {
    newSessionIsAdded: false
}

const adminReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADDED_NEW_SESSION': 
            return {
                ...state,
                newSessionIsAdded: true
            }
        case 'CLEAR_SUCCESS_MESSAGE_NEW_SESSION':
            return {
                ...state,
                newSessionIsAdded: false
            }
        default:
            return state
    }
}

export default adminReducer