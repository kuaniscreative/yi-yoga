import React, { Component } from "react";

class Preview extends Component {
    optionsList = (courses = []) => {
        return courses.length &&
            courses.map((course, i) => {
                const day = course.name.split(" ", 1)[0];
                const time = course.name.replace(`${day} `, "");
                return (
                    <div className="date_dayHero checkboxContainer_message" key={i}>
                        <span className="date_dayHero_day">{day}</span>
                        <span className="date_dayHero_time">{time}</span>
                        <div className="date_dayHero_message">
                            行天宮 ｜ 自備瑜珈墊，可放教室
                        </div>
                    </div>
                );
            });
    };

    render() {
        const courses = this.props.matchCourses;
        return <div>{this.optionsList(courses)}</div>;
    }
}

export default Preview;
