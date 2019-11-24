const initState = {};

const registerClassReducer = (state = initState, action) => {
    switch (action.type) {
        case "OPEN_SELECT_TIME_MODAL":
            console.log(action.options);
            return {
                ...state,
                openSelectTimeModal: true,
                openSelectTimeModal_options: action.options
            };
        case "CLOSE_SELECT_TIME_MODAL":
            return {
                ...state,
                openSelectTimeModal: false,
                openSelectTimeModal_options: null
            };
        case "CREATE_CALENDAR_INFO":
            return {
                ...state,
                calendarInfos: action.infos
            };
        default:
            return state;
    }
};

export default registerClassReducer;
