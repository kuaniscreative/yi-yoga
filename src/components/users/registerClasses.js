import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

// components
import RegularCourseForm from "./registerClasses_regularCourseForm";
import StepIndicator from '../stepIndicator';

// actions
import {
    registerToCourse,
    addStudentToClasses,
    updateRegisterStatus
} from "../../actions/userActions";

class RegisterClasses extends Component {
    state = {
        selected: []
    };

    handleChange = e => {
        let selected = this.state.selected;
        const inputValue = e.target.value;
        if (selected.indexOf(inputValue) > -1) {
            selected = selected.filter(item => {
                return item !== inputValue;
            });
        } else {
            selected.push(inputValue);
        }
        this.setState({
            selected: selected
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const matchCourses = [];
        const session = this.props.session;
        const selected = this.state.selected;

        selected.forEach(selection => {
            session.sortedByCourse.forEach(course => {
                if (selection === course.name) {
                    matchCourses.push(course);
                }
            });
            this.props.updateRegisterStatus(
                selection,
                session.id,
                this.props.userId
            );
        });
        this.props.addStudentToClasses(matchCourses, this.props.userId);
        this.props.registerToCourse(matchCourses, this.props.userId);
    };

    render() {
        return (
            <div id="registerClasses">
                <StepIndicator indicator='選擇課堂' />
                <RegularCourseForm
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    courses={this.props.regularCourse}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const session = state.firestore.ordered.newSession
        ? state.firestore.ordered.newSession[0]
        : null;
    let regularCourse = state.firestore.ordered.regularCourse
        ? state.firestore.ordered.regularCourse
        : null;
    if (regularCourse) {
        regularCourse = regularCourse.map(course => {
            const key = course.name;
            const length = session.sortedByCourse.find(course => {
                return course.name === key;
            }).length;

            return {
                ...course,
                length
            };
        });
    }

    return {
        userId: state.firebase.auth.uid,
        session: session,
        regularCourse: regularCourse
    };
};

const mapDispatchToProps = dispatch => {
    return {
        registerToCourse: (course, userId) => {
            dispatch(registerToCourse(course, userId));
        },
        addStudentToClasses: (course, userId) => {
            dispatch(addStudentToClasses(course, userId));
        },
        updateRegisterStatus: (courseName, sessionId, userId) => {
            dispatch(updateRegisterStatus(courseName, sessionId, userId));
        }
    };
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect([
        { collection: "newSession" },
        { collection: "regularCourse" }
    ])
)(RegisterClasses);
