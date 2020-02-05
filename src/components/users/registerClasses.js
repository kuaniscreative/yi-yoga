import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

// components
import Preview from "./registerClasses_preview";
import RegisterClassSuccess from "./registerClasses_success";
import SelectClassPanel from "./registerClasses_selectClassPanel";

// actions
import { registerToCourse } from "../../actions/userActions";

class RegisterClasses extends Component {
    state = {
        enablePreview: false,
        calendarInitialed: false
    };

    componentWillReceiveProps(nextProps) {
        /**
         *      設定日曆資料
         */
        const shouldSetState = {};

        if (
            !this.state.calendarInitialed &&
            nextProps.session &&
            nextProps.classProfile
        ) {
            const classProfile = nextProps.classProfile;
            const session = nextProps.session;
            const span = session.span;
            const calendarInfo = {};
            span.forEach(stamp => {
                const mm = stamp.split("/")[0];
                const yyyy = stamp.split("/")[1];
                const date = new Date(yyyy, mm - 1);
                const key = date.toLocaleString("default", { month: "short" });
                const dateInfos = this.generateDateInfo(mm - 1, yyyy);
                const mappedClasses = session.classes.map(classInfo => {
                    const matchInClassProfile = classProfile.find(profile => {
                        return profile.id === classInfo.id;
                    });

                    if (matchInClassProfile) {
                        return {
                            ...classInfo,
                            capacity: matchInClassProfile.capacity,
                            numOfStudent: matchInClassProfile.students.length
                        };
                    } else {
                        return {
                            ...classInfo,
                            capacity: 0,
                            numOfStudent: 0
                        }
                    }
                    
                });
                const cellDatas = this.appendClassInfo(
                    dateInfos,
                    mappedClasses
                );
                if (
                    nextProps.userData.allClasses &&
                    nextProps.userData.allClasses.length
                ) {
                    const cellDatasWithUserInfo = this.appendUserInfo(
                        cellDatas,
                        nextProps.userData.allClasses
                    );
                    calendarInfo[key] = cellDatasWithUserInfo;
                } else {
                    calendarInfo[key] = cellDatas;
                }
            });
            nextProps.createCalendarInfo(calendarInfo);

            shouldSetState.calendarInitialed = true;
        }

        /**
         *      如果在preview頁面把課程全部移除，以下設定可以跳轉回日曆畫面
         */
        const selection = nextProps.selection;
        if (!selection.length) {
            shouldSetState.enablePreview = false;
        }
        this.setState({
            ...this.state,
            ...shouldSetState
        });
    }

    generateDateInfo = (month, year) => {
        const date = new Date(year, month, 1);
        const daysInMonth = () => {
            return 32 - new Date(year, month, 32).getDate();
        };
        const howManyCell = () => {
            const startDay = date.getDay();
            const modulo = daysInMonth() % 7;
            const base = parseInt(daysInMonth() / 7);
            if (startDay === 0 && modulo === 0) {
                return base * 7;
            } else if (startDay > 0 && modulo + startDay > 7) {
                return (base + 2) * 7;
            } else {
                return (base + 1) * 7;
            }
        };

        const dateInfo = [];

        for (let i = 0; i < howManyCell(); i++) {
            const startpoint = date.getDay();
            const dateOuput = i - startpoint + 1;
            const newDate = new Date(year, month, dateOuput);
            if (i < startpoint || dateOuput > daysInMonth()) {
                dateInfo.push({
                    date: null
                });
            } else {
                dateInfo.push({
                    date: newDate.toLocaleDateString('zh')
                });
            }
        }

        return dateInfo;
    };

    appendClassInfo = (dateInfos, classes) => {
        const result = dateInfos.map((info, i) => {
            const mappedClasses = classes.map(classInfo => {
                return {
                    dateString: classInfo.date.toDate().toLocaleDateString('zh'),
                    date: classInfo.date.toDate(),
                    id: classInfo.id,
                    capacity: classInfo.capacity,
                    numOfStudent: classInfo.numOfStudent
                };
            });
            const matched = mappedClasses.filter(obj => {
                return obj.dateString === info.date;
            });
            if (matched.length) {
                return {
                    ...info,
                    hasClass: matched.map(obj => {
                        return {
                            date: obj.date,
                            id: obj.id,
                            capacity: obj.capacity,
                            numOfStudent: obj.numOfStudent,
                            selected: false,
                            index: i
                        };
                    })
                };
            } else {
                return {
                    ...info
                };
            }
        });
        return result;
    };

    appendUserInfo = (dateInfos, userClasses) => {
        const userClassIds = userClasses.map(classInfo => {
            return classInfo.id;
        });
        const dateInfosWhichHasClass = dateInfos
            .map((info, i) => {
                return {
                    ...info,
                    index: i
                };
            })
            .filter(info => {
                return info.hasClass;
            });
        const newData = dateInfosWhichHasClass.map(info => {
            const newHasClass = info.hasClass.map(classInfo => {
                if (userClassIds.indexOf(classInfo.id) > -1) {
                    return {
                        ...classInfo,
                        userRegistered: true
                    };
                }
                return classInfo;
            });
            return {
                ...info,
                hasClass: newHasClass
            };
        });
        const newInfos = dateInfos.map(item => {
            return item;
        });
        newData.forEach(data => {
            newInfos[data.index] = data;
        });

        return newInfos;
    };

    toPreview = () => {
        this.setState({
            ...this.state,
            enablePreview: true
        });
    };

    cancelPreview = () => {
        this.setState({
            ...this.state,
            enablePreview: false
        });
    };

    render() {
        return (
            <div id="registerClasses">
                {/**
                 *
                 *       loading bar
                 *
                 */}
                {!this.props.session ? (
                    <div className="customLoadingBar active">
                        <div className="loadingBar_bar"></div>
                    </div>
                ) : null}

                {/**
                 *
                 *       報名表單title & info
                 *
                 */}
                {this.props.session ? (
                    <div id="registerClass_info">
                        <div className="layout_pageTitle">
                            <div className="wrapper">
                                <h1>報名表單</h1>
                                <p>{this.props.session.name}</p>
                            </div>
                        </div>
                    </div>
                ) : null}

                {/**
                 *
                 *       第一步：用日曆選取課程
                 *
                 */}
                {this.props.session && !this.state.enablePreview && !this.props.registerClassSuccess ? (
                    <SelectClassPanel
                        session={this.props.session}
                        setParentState={this.toPreview}
                    />
                ) : null}

                {/**
                 *
                 *       第二步：確認表單
                 *
                 */}
                {this.props.selection.length &&
                this.state.enablePreview &&
                !this.props.registerClassSuccess ? (
                    <Preview
                        selection={this.props.selection}
                        cancelPreview={this.cancelPreview}
                        session={this.props.session}
                    />
                ) : null}

                {/**
                 *
                 *       第三步：報名結果
                 *
                 */}
                {this.props.registerClassSuccess ? (
                    <RegisterClassSuccess />
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const session = state.firestore.ordered.session
        ? state.firestore.ordered.session.find(item => {
              return item.open;
          })
        : null;
    const userData = state.firestore.ordered.user
        ? state.firestore.ordered.user.find(profile => {
              return profile.id === state.firebase.auth.uid;
          })
        : null;

    return {
        userId: state.firebase.auth.uid,
        userData: userData,
        session: session,
        registerClassSuccess: state.user.registerClassSuccess,
        selection: state.registerClass.selection,
        classProfile: state.firestore.ordered.classProfile
    };
};

const mapDispatchToProps = dispatch => {
    return {
        registerToCourse: (course, userId, courseName, amount) => {
            dispatch({ type: "LOADING" });
            dispatch(registerToCourse(course, userId, courseName, amount));
        },
        createCalendarInfo: infos => {
            dispatch({ type: "CREATE_CALENDAR_INFO", infos });
        },
        loading: () => {
            dispatch({ type: "LOADING" });
        },
        loaded: () => {
            dispatch({ type: "LOADED" });
        }
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: "session" },
        { collection: "classProfile" }
    ])
)(RegisterClasses);
