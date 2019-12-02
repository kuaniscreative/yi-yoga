import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class ClassList extends Component {
    componentWillReceiveProps(nextProps) {
        /**
         *      設定日曆資料
         */
        const shouldSetState = {};

        if (nextProps.months && nextProps.classProfile) {
            const classProfile = nextProps.classProfile;
            const span = nextProps.months;
            const calendarInfo = {};
            span.forEach(stamp => {
                const mm = stamp.split("/")[0];
                const yyyy = stamp.split("/")[1];
                const date = new Date(yyyy, mm - 1);
                const key = date.toLocaleString("default", { month: "short" });
                const dateInfos = this.generateDateInfo(mm - 1, yyyy);
                // const cellDatas = this.appendClassInfo(
                //     dateInfos,
                //     classProfile
                // );
                console.log(this.appendClassInfo(dateInfos, classProfile));
                // if (
                //     nextProps.userData.allClasses &&
                //     nextProps.userData.allClasses.length
                // ) {
                //     const cellDatasWithUserInfo = this.appendUserInfo(
                //         cellDatas,
                //         nextProps.userData.allClasses
                //     );
                //     calendarInfo[key] = cellDatasWithUserInfo;
                // } else {
                //     calendarInfo[key] = cellDatas;
                // }
            });
            // nextProps.createCalendarInfo(calendarInfo);

            // shouldSetState.calendarInitialed = true;
        }

        // this.setState({
        //     ...this.state,
        //     ...shouldSetState
        // });
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
                    date: newDate
                });
            }
        }

        return dateInfo;
    };

    appendClassInfo = (dateInfos, classProfile) => {
        const result = dateInfos.map((info, i) => {
            if (info.date) {
                const matched = classProfile.filter(profile => {
                    const profileDateString = profile.classDate.toLocaleDateString();
                    const infoDateString = info.date.toLocaleDateString();
                    return profileDateString === infoDateString;
                });
                if (matched.length) {
                    return {
                        ...info,
                        hasClass: true,
                        classProfile: matched
                    };
                }
            }
            return {
                ...info
            };
        });
        return result;
    };

    render() {
        return (
            <div>
                <div className="layout_pageTitle">
                    <div className="wrapper">
                        <h1>查看課表</h1>
                    </div>
                </div>
                class list
            </div>
        );
    }
}

const mapStateToProps = state => {
    const classProfile = state.firestore.ordered.classProfile;
    const classProfileToDate = classProfile
        ? classProfile.map(profile => {
              return {
                  ...profile,
                  classDate: profile.classDate.toDate()
              };
          })
        : null;
    const getMonths = () => {
        if (classProfile) {
            const months = [];
            classProfile.forEach(profile => {
                const month = profile.classDate.toDate().getMonth();
                const year = profile.classDate.toDate().getFullYear();
                const stamp = `${month + 1}/${year}`;
                if (months.indexOf(stamp) < 0) {
                    months.push(stamp);
                }
            });

            return months;
        }
        return null;
    };
    return {
        months: getMonths(),
        classProfile: classProfileToDate
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: "classProfile" }])
)(ClassList);
