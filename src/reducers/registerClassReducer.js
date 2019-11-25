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
        case "CLASS_SELECTED": {
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
                data.selection.forEach(classInfo => {
                    if (
                        !selection.filter(info => {
                            return info.id === classInfo.id;
                        }).length
                    ) {
                        selection.push(classInfo);
                    }
                });

                return selection;
            }

            return {
                ...state,
                calendarInfos: returnSelectedResult(action.data),
                selection: resolvedSelection(action.data)
            };
        }
        case 'REMOVE_CLASS_WHEN_REGISTER_CLASS': {
            function removeClassInCalendarInfo(info) {
                const calendarInfos = Object.assign({}, state.calendarInfos);
                const key = info.key;
                const index = info.index;
                const hasClass = calendarInfos[key][index].hasClass;
                const alteredHasClass = hasClass.map((hasClassInfo) => {
                    if (hasClassInfo.id === info.id) {
                        return {
                            ...hasClassInfo,
                            selected: false
                        }
                    }
                    return hasClassInfo
                }) 
                calendarInfos[key][index].hasClass = alteredHasClass
                return calendarInfos
            }
            function removeClassInSelection(id) {
                return state.selection.filter((info) => {
                    return info.id !== id
                })
            }

            return {
                ...state,
                calendarInfos: removeClassInCalendarInfo(action.info),
                selection: removeClassInSelection(action.info.id)
            }
        }
            
        default:
            return state;
    }
};

export default registerClassReducer;
