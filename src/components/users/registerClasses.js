import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

// components
import RegularCourseForm from "./registerClasses_regularCourseForm";
import StepIndicator from "../stepIndicator";
import Preview from "./registerClasses_preview";
import RegisterClassSuccess from "./registerClasses_success";

// actions
import { registerToCourse } from "../../actions/userActions";

class RegisterClasses extends Component {
    state = {
        selected: [],
        enablePreview: false,
        matchCourses: []
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

    courseSelected = e => {
        e.preventDefault();

        const matchCourses = [];
        const course = this.props.course;
        const selected = this.state.selected;

        selected.forEach(selection => {
            course.forEach(courseInfo => {
                if (selection === courseInfo.name) {
                    matchCourses.push(courseInfo);
                }
            });
        });
        let canApply = true;
        let doubuled;
        matchCourses.forEach((courseInfo) => {
            if (courseInfo.registeredStudents.indexOf(this.props.userId) >= 0) {
                canApply = false
                doubuled = courseInfo;
            }
        })

        if (!canApply) {
            alert(`${doubuled.name}已經報名過了`)
        } else {
            this.setState({
                selected: [],
                enablePreview: true,
                matchCourses: matchCourses
            });
        }
    };

    deselect = course => {
        const currentCourses = this.state.matchCourses;
        const afterDeletion = currentCourses.filter(item => {
            return item !== course;
        });

        if (afterDeletion.length) {
            this.setState(
                {
                    ...this.state,
                    matchCourses: afterDeletion
                }
            );
        } else {
            this.setState(
                {
                    ...this.state,
                    enablePreview: false,
                    matchCourses: afterDeletion
                },
                () => {
                    console.log(this.state);
                }
            );
        }
    };

    apply = () => {
        const selectedCourse = this.state.matchCourses;
        const userId = this.props.userId;
        const session = this.props.session;
        const amount =
            this.state.matchCourses.reduce((acc, cValue, cIndex) => {
                return acc + cValue.length;
            }, 0) * 250;
        
        this.props.registerToCourse(
            selectedCourse,
            userId,
            session.name,
            amount
        );
    };

    indicatorOutput = () => {
        if (this.state.enablePreview === false) {
            return "選擇報名課堂";
        } else if (this.state.enablePreview === true) {
            return "確認表單";
        }
    };

    conditionalComponents = () => {
        const preview = this.state.enablePreview;
        const success = this.props.registerClassSuccess;

        if (success) {
            return <RegisterClassSuccess />;
        } else if (preview) {
            return (
                <Preview
                    matchCourses={this.state.matchCourses}
                    deselect={this.deselect}
                    apply={this.apply}
                />
            );
        } else {
            return (
                <RegularCourseForm
                    handleChange={this.handleChange}
                    handleSubmit={this.courseSelected}
                    courses={this.props.regularCourse}
                />
            );
        }
    };

    render() {
        return (
            <div id="registerClasses" className='actionCard'>
                <div className='actionCard_title'>
                    <p>報名</p>
                </div>
                <StepIndicator indicator={this.indicatorOutput()} className='actionCard_content'/>
                {this.conditionalComponents()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const session = state.firestore.ordered.session
        ? state.firestore.ordered.session.find((item) => {
            return item.open
        })
        : null;
    const course = session && state.firestore.ordered.course ? state.firestore.ordered.course.filter((item) => {
        return item.session === session.id;
    }) : null
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
        registerClassSuccess: state.user.registerClassSuccess
    };
};

const mapDispatchToProps = dispatch => {
    return {
        registerToCourse: (course, userId, courseName, amount) => {
            dispatch({ type: "LOADING" });
            dispatch(registerToCourse(course, userId, courseName, amount));
        }
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: "session" },
        { collection: 'course' },
        { collection: "regularCourse" }
    ])
)(RegisterClasses);
