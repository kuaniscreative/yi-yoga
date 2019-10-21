import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class Reschedule extends Component {

    state = {
        timeTable: []
    }

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

    requestTimeTable = classStamp => {
        this.setState({
            ...this.state,
            timeTable: this.classFilter(classStamp)
        })
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
