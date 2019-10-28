import React, { Component } from "react";
import { Link } from 'react-router-dom'

class Preview extends Component {
    optionsList = (courses = []) => {
        return (
            courses.length &&
            courses.map((course, i) => {
                const day = course.name.split(" ", 1)[0];
                const time = course.name.replace(`${day} `, "");
                return (
                    <div key={i} className="checkboxContainer">
                        <div className="date_dayHero checkboxContainer_message">
                            <span className="date_dayHero_day">{day}</span>
                            <span className="date_dayHero_time">{time}</span>
                            <div className="date_dayHero_message">
                                {`${course.length}堂課，金額${course.length *
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
            <div className="preview">
                {this.optionsList(courses)}
                <div className="nextStepButtonsArea">
                    <button className="outlineButton" onClick={this.props.apply}>確認</button>
                    <Link to="/" className="cancelGray">
                        取消
                    </Link>
                </div>
            </div>
        );
    }
}

export default Preview;
