import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

// components

// actions
import { registerToCourse, addStudentToClasses } from '../../actions/userActions';

class RegisterClasses extends Component {

    state = {
        selected: []
    }

    handleChange = (e) => {
        let selected = this.state.selected;
        const inputValue = e.target.value;
        if (selected.indexOf(inputValue) > -1) {
            selected = selected.filter((item) => {
                return item !== inputValue
            })
        } else {
            selected.push(inputValue)
        }
        this.setState({
            selected: selected
        })
    }

    handleSubmit = (e) => {

        e.preventDefault();

        const matchCourses = [];
        const session = this.props.session[0].sortedByCourse;
        const selected = this.state.selected;

        selected.forEach((selection) => {
            session.forEach((course) => {
                if (selection === course.name) {
                    matchCourses.push(course);
                }
            })
        })
        this.props.addStudentToClasses(matchCourses, this.props.userId)
        this.props.registerToCourse(matchCourses, this.props.userId);
    }

    render() {
        const session = this.props.session ? this.props.session[0].sortedByCourse : null;
        return (
            <form onSubmit={this.handleSubmit}>
                {
                    session && session.map((item, i) => {
                        return (
                            <div key={i}>
                                <input type="checkbox" name={item.name} value={item.name} onChange={this.handleChange} /> {`${item.name} 共${item.length}堂`}
                            </div>  
                        )
                    })
                }
                <button>確認</button>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.firebase.auth.uid,
        session: state.firestore.ordered.newSession
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerToCourse: (course, userId) => { dispatch(registerToCourse(course, userId)) },
        addStudentToClasses: (course, userId) => { dispatch(addStudentToClasses(course, userId)) }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'newSession'}
    ])
)(RegisterClasses)