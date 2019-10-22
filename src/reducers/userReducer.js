const initState = {

}

const userReducer = (state = initState, action) => {
    switch (action.type) {  
        case 'REGISTERED_TO_COURSE':
            console.log('REGISTERED_TO_COURSE');
            return state 
        case 'RESCHEDULE_STAMP_SELECTED': 
            return {
                ...state,
                selectedRecheduleStamp: action.stamp
            }
        default:
            return state
    }
}

export default userReducer