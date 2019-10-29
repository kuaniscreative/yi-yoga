import React, { Component } from "react";

class DateSingle extends Component {
    state = {
        selected: false
    };

    handleClick = () => {
        this.props.submit(this.props.classSingle);
    };

    render() {
        const yyyy = this.props.classSingle.toDate().getFullYear();
        const mm = this.props.classSingle.toDate().getMonth();
        const dd = this.props.classSingle.toDate().getDate();
        const hr = this.props.classSingle.toDate().getHours();
        const min = this.props.classSingle.toDate().getMinutes();
        const startAt = `${hr}:${min}`;
        const day = this.props.classSingle.toDate().getDay();
        const dayOutput = `週${day.toLocaleString("zh-u-nu-hanidec")}`;

        return (
            <label className="shadowOption" onClick={this.handleClick}>
                <div className="dateHero">
                    <span name="date">{`${dd}`}</span>
                    <span name="monthYear">{`${mm + 1}月 ${yyyy}`}</span>
                    <span name="seperator"> | </span>
                    <span name="dayTime">{`${dayOutput} ${startAt}`}</span>
                </div>
            </label>
        );
    }
}

export default DateSingle;
