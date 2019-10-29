const initState = {

}

const userReducer = (state = initState, action) => {
    switch (action.type) {  
        case 'REGISTERED_TO_COURSE':
            console.log('REGISTERED_TO_COURSE');
            return {
                ...state,
                registerClassSuccess: true
            }
        case 'RESCHEDULE_STAMP_SELECTED': 
            return {
                ...state,
                selectedRecheduleStamp: action.stamp
            }

        case 'LEAVE_APPLICATION_SUCCESS':
            return {
                ...state,
                leaveApplicationSuccess: true
            }
        case 'CLEAR_SUCCESS_MESSAGE':
            return {
                ...state,
                leaveApplicationSuccess: false
            }
        default:
            return state
    }
}

export default userReducer