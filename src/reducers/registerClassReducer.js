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
        case "SEND":
            console.log("in reducer");
            return {
                ...state,
                infos: action.infos
            };
        default:
            return state;
    }
};

export default registerClassReducer;
