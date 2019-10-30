import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RegularCourseForm extends Component {

    render() {
        const handleSubmit = this.props.handleSubmit;
        const handleChange = this.props.handleChange;
        const courses = this.props.courses;
        return (
             <form onSubmit={handleSubmit} className='regularCourseForm'>
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
                                            行天宮 ｜ 自備瑜珈墊，可放教室
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
                    <div className="nextStepButtonsArea">
                        <button className="outlineButton">確認</button>
                        <Link to="/" className="cancelGray">
                            取消
                        </Link>
                    </div>
                </form>
        )
    }
}

export default RegularCourseForm