import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// components
import NextStepButtonsArea from '../ui/nextStepButtonArea';

class RegularCourseForm extends Component {

    render() {
        const handleSubmit = this.props.handleSubmit;
        const handleChange = this.props.handleChange;
        const courses = this.props.courses;
        return (
             <form onSubmit={handleSubmit} className='regularCourseForm nextStepButtonsArea_parent'>
                    {
                        courses && courses.map((course, i) => {
                            return (
                                <label key={i} className="checkboxContainer">
                                    <div className="dayHero checkboxContainer_message">
                                        <span className="dayHero_day">
                                            {course.day}
                                        </span>
                                        <span className="dayHero_time">
                                            {course.time}
                                        </span>
                                        <div className="dayHero_message">
                                            {course.classInfo}
                                        </div>
                                    </div>

                                    <div className="checkboxContainer_checkbox">
                                        <input
                                            type="checkbox"
                                            name={course.name}
                                            value={course.name}
                                            onChange={handleChange}
                                        />
                                        <span className="checkmark"></span>
                                    </div>
                                </label>
                            );
                        })}
                        <NextStepButtonsArea />
                </form>
        )
    }
}

export default RegularCourseForm