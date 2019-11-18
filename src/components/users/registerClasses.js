import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

// components
import RegularCourseForm from "./registerClasses_regularCourseForm";
import StepIndicator from "../stepIndicator";
import Preview from "./registerClasses_preview";
import RegisterClassSuccess from './registerClasses_success';

// actions
import {
    registerToCourse,
    addStudentToClasses,
    updateRegisterStatus,
    addPaymentStatus
} from "../../actions/userActions";

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
        const session = this.props.session;
        const selected = this.state.selected;

        selected.forEach(selection => {
            session.sortedByCourse.forEach(course => {
                if (selection === course.name) {
                    matchCourses.push(course);
                }
            });
        });

        this.setState({
            selected: [],
            enablePreview: true,
            matchCourses: matchCourses
        });
    };

    deselect = (course) => {
        const currentCourses = this.state.matchCourses;
        const afterDeletion = currentCourses.filter((item) => {
            return item !== course;
        })

        if (afterDeletion.length) {
            this.setState({
                ...this.state,
                matchCourses: afterDeletion
            }, () => {
                console.log(this.state);
            })
        } else {
            this.setState({
                ...this.state,
                enablePreview: false,
                matchCourses: afterDeletion
            }, () => {
                console.log(this.state);
            })
        }

        
    }

    apply = () => {
        const selectedCourse = this.state.matchCourses;
        const userId = this.props.userId;
        const session = this.props.session;
        const amount = this.state.matchCourses.reduce((acc, cValue, cIndex) => {
            return acc + cValue.length
        }, 0) * 250

        selectedCourse.forEach((course) => {
            this.props.updateRegisterStatus(
                course,
                session.id,
                userId
            );
        })
        this.props.addStudentToClasses(selectedCourse, userId);
        this.props.registerToCourse(selectedCourse, userId);
        this.props.addPaymentStatus(session.name, userId, amount)
    }

    indicatorOutput = () => {
        if (this.state.enablePreview === false) {
            return '選擇課堂'
        } else if (this.state.enablePreview === true) {
            return '確認表單'
        }
    }

    conditionalComponents = () => {
        const preview =  this.state.enablePreview;
        const success = this.props.registerClassSuccess;

        if (success) {
            return <RegisterClassSuccess />
        } else if (preview) {
            return  <Preview matchCourses={this.state.matchCourses}  deselect = {this.deselect} apply={this.apply}/>
        } else {
            return <RegularCourseForm
            handleChange={this.handleChange}
            handleSubmit={this.courseSelected}
            courses={this.props.regularCourse}
        />
        }
    }

    render() {
        return (
            <div id="registerClasses">
                <StepIndicator indicator={this.indicatorOutput()} />
                {
                    this.conditionalComponents()
                }
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
        regularCourse: regularCourse ? regularCourse.sort((a, b) => {
            return a.reference.seconds - b.reference.seconds
        }) : null,
        registerClassSuccess: state.user.registerClassSuccess
    };
};

const mapDispatchToProps = dispatch => {
    return {
        registerToCourse: (course, userId) => {
            dispatch({type: 'LOADING'});
            dispatch(registerToCourse(course, userId));
        },
        addStudentToClasses: (course, userId) => {
            dispatch(addStudentToClasses(course, userId));
        },
        updateRegisterStatus: (courseName, sessionId, userId) => {
            dispatch(updateRegisterStatus(courseName, sessionId, userId));
        },
        addPaymentStatus: (courseName, userId, amount) => {
            dispatch(addPaymentStatus(courseName, userId, amount))
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
