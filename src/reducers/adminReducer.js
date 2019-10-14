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
        default:
            return state
    }
}

export default adminReducer