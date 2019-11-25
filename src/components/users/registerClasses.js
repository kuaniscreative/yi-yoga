import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

// components
import RegularCourseForm from "./registerClasses_regularCourseForm";
import Preview from "./registerClasses_preview";
import RegisterClassSuccess from "./registerClasses_success";
import SelectClassPanel from "./registerClasses_selectClassPanel";

// actions
import { registerToCourse } from "../../actions/userActions";

class RegisterClasses extends Component {
    state = {
        selected: [],
        enablePreview: false,
        matchCourses: [],
        calendarInitialed: false
    };

    // handleChange = e => {
    //     let selected = this.state.selected;
    //     const inputValue = e.target.value;
    //     if (selected.indexOf(inputValue) > -1) {
    //         selected = selected.filter(item => {
    //             return item !== inputValue;
    //         });
    //     } else {
    //         selected.push(inputValue);
    //     }
    //     this.setState({
    //         selected: selected
    //     });
    // };

    // courseSelected = e => {
    //     e.preventDefault();

    //     const matchCourses = [];
    //     const course = this.props.course;
    //     const selected = this.state.selected;

    //     selected.forEach(selection => {
    //         course.forEach(courseInfo => {
    //             if (selection === courseInfo.name) {
    //                 matchCourses.push(courseInfo);
    //             }
    //         });
    //     });
    //     let canApply = true;
    //     let doubuled;
    //     matchCourses.forEach(courseInfo => {
    //         if (courseInfo.registeredStudents.indexOf(this.props.userId) >= 0) {
    //             canApply = false;
    //             doubuled = courseInfo;
    //         }
    //     });

    //     if (!canApply) {
    //         alert(`${doubuled.name}已經報名過了`);
    //     } else {
    //         this.setState({
    //             selected: [],
    //             enablePreview: true,
    //             matchCourses: matchCourses
    //         });
    //     }
    // };

    // deselect = course => {
    //     const currentCourses = this.state.matchCourses;
    //     const afterDeletion = currentCourses.filter(item => {
    //         return item !== course;
    //     });

    //     if (afterDeletion.length) {
    //         this.setState({
    //             ...this.state,
    //             matchCourses: afterDeletion
    //         });
    //     } else {
    //         this.setState(
    //             {
    //                 ...this.state,
    //                 enablePreview: false,
    //                 matchCourses: afterDeletion
    //             },
    //             () => {
    //                 console.log(this.state);
    //             }
    //         );
    //     }
    // };

    // apply = () => {
    //     const selectedCourse = this.state.matchCourses;
    //     const userId = this.props.userId;
    //     const session = this.props.session;
    //     const amount =
    //         this.state.matchCourses.reduce((acc, cValue, cIndex) => {
    //             return acc + cValue.length;
    //         }, 0) * 250;

    //     this.props.registerToCourse(
    //         selectedCourse,
    //         userId,
    //         session.name,
    //         amount
    //     );
    // };

    // indicatorOutput = () => {
    //     if (this.state.enablePreview === false) {
    //         return "選擇報名課堂";
    //     } else if (this.state.enablePreview === true) {
    //         return "確認表單";
    //     }
    // };

    // conditionalComponents = () => {
    //     const preview = this.state.enablePreview;
    //     const success = this.props.registerClassSuccess;

    //     if (success) {
    //         return <RegisterClassSuccess />;
    //     } else if (preview) {
    //         return (
    //             <Preview
    //                 matchCourses={this.state.matchCourses}
    //                 deselect={this.deselect}
    //                 apply={this.apply}
    //             />
    //         );
    //     } else {
    //         return (
    //             <RegularCourseForm
    //                 handleChange={this.handleChange}
    //                 handleSubmit={this.courseSelected}
    //                 courses={this.props.regularCourse}
    //             />
    //         );
    //     }
    // };

    // selectSession = e => {
    //     const sessionId = e.target.dataset.session;
    //     this.setState({
    //         ...this.state,
    //         session: sessionId
    //     });
    // };

    componentWillReceiveProps(nextProps) {
        /**
         *      設定日曆資料
         */
        const shouldSetState = {};
        if (!this.state.calendarInitialed && nextProps.session) {
            const session = nextProps.session;
            const span = session.span;
            const calendarInfo = {};
            span.forEach(stamp => {
                const mm = stamp.split("/")[0];
                const yyyy = stamp.split("/")[1];
                const date = new Date(yyyy, mm - 1);
                const key = date.toLocaleString("default", { month: "short" });
                const dateInfos = this.generateDateInfo(mm - 1, yyyy);
                const cellDatas = this.appendClassInfo(
                    dateInfos,
                    nextProps.session.classes
                );

                calendarInfo[key] = cellDatas;
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
                    date: newDate.toLocaleDateString()
                });
            }
        }

        return dateInfo;
    };

    appendClassInfo = (dateInfos, classes) => {
        const result = dateInfos.map(info => {
            const mappedClasses = classes.map(classInfo => {
                return {
                    dateString: classInfo.date.toDate().toLocaleDateString(),
                    date: classInfo.date.toDate(),
                    id: classInfo.id
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
                            selected: false
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
            <div id="registerClasses" className="actionCard titleWithInfoAbove">
                {!this.props.session ? (
                    <div className="customLoadingBar active">
                        <div className="loadingBar_bar"></div>
                    </div>
                ) : null}
                {this.props.session ? (
                    <div className="actionCard_title">
                        <p className="titleWithInfoAbove_above">報名表單</p>
                        <p className="titleWithInfoAbove_title">
                            {this.props.session.name}
                        </p>
                    </div>
                ) : null}
                {/**
                 *
                 *       第一步：用日曆選取課程
                 *
                 */}
                {this.props.session && !this.state.enablePreview ? (
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
                {this.props.selection.length && this.state.enablePreview ? (
                    <Preview
                        selection={this.props.selection}
                        cancelPreview={this.cancelPreview}
                        session={this.props.session}
                    />
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
    const course =
        session && state.firestore.ordered.course
            ? state.firestore.ordered.course.filter(item => {
                  return item.session === session.id;
              })
            : null;
    let regularCourse = state.firestore.ordered.regularCourse
        ? state.firestore.ordered.regularCourse
        : null;

    return {
        userId: state.firebase.auth.uid,
        session: session,
        course: course,
        regularCourse: regularCourse
            ? regularCourse.sort((a, b) => {
                  return a.reference.seconds - b.reference.seconds;
              })
            : null,
        registerClassSuccess: state.user.registerClassSuccess,
        selection: state.registerClass.selection
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
        { collection: "course" },
        { collection: "regularCourse" },
        { collection: "classProfile" }
    ])
)(RegisterClasses);
