const initState = {
    /**
     *
     *      calendatInfos: {
     *          Jan: [
     *              {
     *                  date: date obj or null,
     *                  hasClass: [
     *                      {
     *                          date: date obj,
     *                          id: string of classId,
     *                          selected Boolean
     *                      }
     *                  ]
     *              }
     *          ]
     *      }
     *
     */
    selection: []
};

const registerClassReducer = (state = initState, action) => {
    switch (action.type) {
        case "OPEN_SELECT_TIME_MODAL":
            return {
                ...state,
                openSelectTimeModal: true,
                openSelectTimeModal_data: action.data
            };
        case "CLOSE_SELECT_TIME_MODAL":
            return {
                ...state,
                openSelectTimeModal: false,
                openSelectTimeModal_data: undefined
            };
        case "CREATE_CALENDAR_INFO":
            return {
                ...state,
                calendarInfos: action.infos
            };
        case "CLASS_SELECTED":
            function returnSelectedResult(data) {
                const calendarInfos = Object.assign({}, state.calendarInfos);
                const key = data.key;
                const index = data.index;
                const selection = data.selection;
                const hasClass = calendarInfos[key][index].hasClass;
                const alteredHasClass = hasClass.map(classInfo => {
                    if (
                        !selection.filter(info => {
                            return info.id === classInfo.id;
                        }).length
                    ) {
                        return {
                            ...classInfo,
                            selected: false
                        };
                    } else {
                        return {
                            ...classInfo,
                            selected: true
                        };
                    }
                });
                calendarInfos[key][index].hasClass = alteredHasClass;
                return calendarInfos;
            }

            function resolvedSelection(data) {
                const selection = state.selection.filter(info => {
                    return !data.deletion.some(deletionId => {
                        return deletionId === info.id;
                    });
                });
                data.selection.forEach(classId => {
                    if (
                        !selection.filter(info => {
                            return info.id === classId;
                        }).length
                    ) {
                        selection.push(classId);
                    }
                });

                return selection;
            }

            return {
                ...state,
                calendarInfos: returnSelectedResult(action.data),
                selection: resolvedSelection(action.data)
            };
        default:
            return state;
    }
};

export default registerClassReducer;
