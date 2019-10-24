import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

// components

// actions
import {
    registerToCourse,
    addStudentToClasses
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
            session.forEach(course => {
                if (selection === course.name) {
                    matchCourses.push(course);
                }
            });
        });
        this.props.addStudentToClasses(matchCourses, this.props.userId);
        this.props.registerToCourse(matchCourses, this.props.userId);
    };

    render() {
        const courses = this.props.regularCourse;
        return (
            <form onSubmit={this.handleSubmit}>
                {courses &&
                    courses.map((course, i) => {
                        return (
                            <label key={i} className="checkboxContainer">
                                <div className="date_dayHero checkboxContainer_message">
                                    <span className="date_dayHero_day">
                                        {course.day}
                                    </span>
                                    <span className="date_dayHero_time">
                                        {course.time}
                                    </span>
                                    <div className="date_dayHero_message">
                                        行天宮 ｜ 自備瑜珈墊，可放教室
                                    </div>
                                </div>

                                <div className="checkboxContainer_checkbox">
                                    <input
                                        type="checkbox"
                                        name={course.name}
                                        value={course.name}
                                        onChange={this.handleChange}
                                    />
                                    <span className="checkmark"></span>
                                </div>
                            </label>
                        );
                    })}
                <button>確認</button>
            </form>
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
