const initState = {};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case "REGISTERED_TO_COURSE":
            return {
                ...state,
                registerClassSuccess: true
            };
        case "CLEAR_SUCCESS_MESSAGE_REGISTER_CLASS":
            return {
                ...state,
                registerClassSuccess: false
            };
        case "ADD_PAYMENT_SUCCESS":
            return {
                ...state,
                paymentId: action.id
            };
        case "LEAVE_APPLICATION_SUCCESS":
            return {
                ...state,
                leaveApplicationSuccess: true
            };
        case "CLEAR_SUCCESS_MESSAGE_LEAVE":
            return {
                ...state,
                leaveApplicationSuccess: false
            };
        case "RESCHEDULE_ADD_SUCCESS":
            return {
                ...state,
                reacheduleAddSuccess: true
            };
        case "RESCHEDULE_PENDING_SUCCESS":
            return {
                ...state,
                reachedulePendingSuccess: true
            };
        case "CLEAR_SUCCESS_MESSAGE_RESCHEDULE":
            return {
                ...state,
                reacheduleAddSuccess: false,
                reachedulePendingSuccess: false
            };
        case "UPDATE_PAYMENT_SUCCESS":
            return {
                ...state,
                updatePaymentSuccess: true
            };
        case 'RESCHEDULE_QUERY_PROCESSED':
            return {
                ...state,
                rescheduleQueryProcessed: true
            }
        default:
            return state;
    }
};

export default userReducer;
