import React, { Component } from "react";

class DateSingle extends Component {
    state = {
        selected: false
    };

    handleSelect = () => {
        if (this.props.canApply) {
            this.props.select(this.props.classSingle);
        }
    };

    conditionalCheckmark = () => {
        return this.props.canApply ? (
            <div className="checkboxContainer_checkbox">
                    <input
                        type="radio"
                        name='leaveDate'
                        onChange={this.handleSelect}
                    />
                    <span className="checkmark"></span>
                </div>
        ) : (
            <div className="checkboxContainer_checkbox">
                不可請假
            </div>
        )
    }

    render() {
        const yyyy = this.props.classSingle.toDate().getFullYear();
        const mm = this.props.classSingle.toDate().getMonth();
        const dd = this.props.classSingle.toDate().getDate();
        const hr = this.props.classSingle.toDate().getHours();
        const min = this.props.classSingle.toDate().getMinutes();
        const startAt = `${hr}:${min}`;
        const day = this.props.classSingle.toDate().getDay();
        const dayOutput = `週${day.toLocaleString("zh-u-nu-hanidec")}`;
        const disableSelect = this.props.canApply ? "" : "disableSelect";

        return (
            <label
                className={`checkboxContainer ${disableSelect}`}
                onClick={this.handleClick}
            >
                <div className="dayHero checkboxContainer_message">
                    <div className="dateHero">
                        <span name="date">{`${dd}`}</span>
                        <span name="monthYear">{`${mm + 1}月 ${yyyy}`}</span>
                        <span name="seperator"> | </span>
                        <span name="dayTime">{`${dayOutput} ${startAt}`}</span>
                    </div>
                </div>
                {
                    this.conditionalCheckmark()
                }
            </label>
        );
    }
}

export default DateSingle;
