const initState = {

}

const userReducer = (state = initState, action) => {
    switch (action.type) {  
        case 'REGISTERED_TO_COURSE':
            console.log('REGISTERED_TO_COURSE');
            return state 
        default:
            return state
    }
}

export default userReducer