import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

// components
import Preview from "./reschedule_preview";

class Reschedule extends Component {
    state = {
        timeTable: []
    };

    classFilter = classStamp => {
        const split = classStamp.split("/");
        const yyyy = split[0];
        const mm = parseInt(split[1], 10) - 1;
        const selectedDate = new Date(yyyy, mm);
        const nextMonth = new Date(yyyy, mm + 1);

        return this.props.classProfile.filter(profile => {
            const month = profile.classDate.toDate().getMonth();
            const year = profile.classDate.toDate().getFullYear();
            return (
                (month === selectedDate.getMonth() &&
                    year === selectedDate.getFullYear()) ||
                (month === nextMonth.getMonth() &&
                    year === nextMonth.getFullYear())
            );
        });
    };

    sortClassesByDay = (classes = []) => {
        // map the timestamps to date objects
        let dates = classes.map(classInfo => {
            return {
                ...classInfo,
                classDate: classInfo.classDate.toDate()
            };
        });

        // sort the dates by month
        const sortedByDay = [];
        dates.forEach(classInfo => {
            const day = classInfo.classDate.getDay();
            if (sortedByDay[day]) {
                sortedByDay[day].push(classInfo);
            } else {
                sortedByDay[day] = []
            }
        });

        return sortedByDay
    };

    requestTimeTable = classStamp => {
        const available = this.classFilter(classStamp);
        const sorted = this.sortClassesByDay(available);
        this.setState({
            ...this.state,
            timeTable: sorted
        });
    };

    render() {
        return (
            <div id="reschedule">
                補課安排
                {this.props.reschedulable &&
                    this.props.reschedulable.map((classSingle, i) => {
                        return (
                            <div key={i}>
                                {classSingle}
                                <button
                                    onClick={() => {
                                        this.requestTimeTable(classSingle);
                                    }}
                                >
                                    補課
                                </button>
                            </div>
                        );
                    })}
                {this.state.timeTable.length ? (
                    <Preview classes={this.state.timeTable} />
                ) : null}
                <Link to="/">取消</Link>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const uid = state.firebase.auth.isempty
        ? undefined
        : state.firebase.auth.uid;
    const userData =
        uid && state.firestore.ordered.user
            ? state.firestore.ordered.user.find(user => {
                  return user.id === uid;
              })
            : {};
    return {
        reschedulable: userData.reschedulable,
        classProfile: state.firestore.ordered.classProfile
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: "user" }, { collection: "classProfile" }])
)(Reschedule);
