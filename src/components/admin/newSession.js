import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

// components
import NewSessionForm from "./newSession_form";
import NewSessionPreview from "./newSession_preview";

// actions
import { registerSession } from "../../actions/adminActions";

class NewSession extends Component {
    state = {
        period: [],
        classes: [],
        periodInputIsValid: true
    };

    getSession = (start, end) => {
        const startDate = new Date(start.year, start.month - 1, 1);
        const endDate = new Date(end.year, end.month, 0);
        const regularCourse = this.props.regularCourse;
        const targets = [];

        // get the classes and push them to targets
        while (startDate.valueOf() !== endDate.valueOf()) {
            const day = startDate.getDay();
            const match = regularCourse.filter(course => {
                return course.dayNum === day;
            });

            if (match.length) {
                match.forEach(course => {
                    const d = new Date(
                        startDate.getFullYear(),
                        startDate.getMonth(),
                        startDate.getDate(),
                        course.reference.toDate().getHours(),
                        course.reference.toDate().getMinutes()
                    );
                    targets.push({
                        date: d,
                        capacity: course.capacity,
                        name: course.name
                    });
                });
            }

            startDate.setDate(startDate.getDate() + 1);
        }
        return targets;
    };

    setSessionPeriod = (start, end) => {
        const classes = this.getSession(start, end);
        if (classes.length === 0) {
            this.setState({
                ...this.state,
                periodInputIsValid: false
            });
        } else {
            this.setState({
                ...this.state,
                period: [start, end],
                classes: classes
            });
        }
    };

    clearSessionInfo = () => {
        this.setState({
            ...this.state,
            classes: [],
            period: []
        })
    }

    deleteClassWhenPreview = id => {
        const classes = this.state.classes.filter(classSingle => {
            return classSingle.id !== id;
        });
        this.setState({
            ...this.state,
            classes: classes
        });
    };

    addSession = () => {
        const period = this.state.period;
        const name = `${period[0].year}年 ${period[0].month}月 - ${period[1].month}月`;
        const sessionInfo = {
            name: name,
            classInfos: this.state.classes,
            period: period
        };
        this.props.registerSession(sessionInfo);
    };

    render() {
        return (
            <div id='newSession'>
                {this.state.classes.length ? (
                    <NewSessionPreview
                        classes={this.state.classes}
                        deleteClassWhenPreview={this.deleteClassWhenPreview}
                        addSession={this.addSession}
                        clearSessionInfo={this.clearSessionInfo}
                    />
                ) : (
                    <NewSessionForm
                        setSessionPeriod={this.setSessionPeriod}
                        validPeriod={this.state.periodInputIsValid}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        regularCourse: state.firestore.ordered.regularCourse,
        newSessionIsAdded: state.admin.newSessionIsAdded
    };
};

const mapDispatchToProps = dispatch => {
    return {
        registerSession: sessionInfo => {
            dispatch(registerSession(sessionInfo));
        }
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: "regularCourse" }])
)(NewSession);
