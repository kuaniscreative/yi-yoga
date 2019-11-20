import React, { Component } from "react";
import { Link } from 'react-router-dom';

// components
import NextStepButtonsArea from '../ui/nextStepButtonArea';

class Preview extends Component {
    optionsList = (courses = []) => {
        return (
            courses.length &&
            courses.map((course, i) => {
                const day = course.name.split(" ", 1)[0];
                const time = course.name.replace(`${day} `, "");
                return (
                    <div key={i} className="checkboxContainer noReverse">
                        <div className="dayHero checkboxContainer_message">
                            <span className="dayHero_day">{day}</span>
                            <span className="dayHero_time">{time}</span>
                            <div className="dayHero_message">
                                {`${course.classes.length}堂課，金額${course.classes.length *
                                    250}元`}
                            </div>
                        </div>

                        <div className="checkboxContainer_checkbox">
                            <button
                                className="cancelRed"
                                onClick={() => {
                                    this.props.deselect(course);
                                }}
                            >
                                取消
                            </button>
                        </div>
                    </div>
                );
            })
        );
    };

    render() {
        const courses = this.props.matchCourses;
        return (
            <div className="preview nextStepButtonsArea_parent">
                <div className="options">
                {this.optionsList(courses)}
                </div>
                <NextStepButtonsArea action={this.props.apply}/>
            </div>
        );
    }
}

export default Preview;
