import React, { Component } from "react";
import { connect } from "react-redux";

// components
import CalendarCellWithClassInfo from "./registerClasses_calendarCellWithClassInfo";

class Calendar extends Component {
    paintCalendar = calendarInfo => {
        const className = `calendar ${this.props.className}`;
        return (
            <div className={className}>
                <div className="weekDay calendarCellWrapper">
                    <div className="calendarCell">
                        <span>日</span>
                    </div>
                    <div className="calendarCell">
                        <span>一</span>
                    </div>
                    <div className="calendarCell">
                        <span>二</span>
                    </div>
                    <div className="calendarCell">
                        <span>三</span>
                    </div>
                    <div className="calendarCell">
                        <span>四</span>
                    </div>
                    <div className="calendarCell">
                        <span>五</span>
                    </div>
                    <div className="calendarCell">
                        <span>六</span>
                    </div>
                </div>
                <div className="calenderDay calendarCellWrapper">
                    {calendarInfo.map((data, i) => {
                        if (!data.date) {
                            return (
                                <div className="calendarCell" key={i}>
                                    <span></span>
                                </div>
                            );
                        } else if (!data.hasClass) {
                            let split = data.date.split("/").map(str => {
                                return parseInt(str);
                            });
                            const date = new Date(
                                split[2],
                                split[1] - 1,
                                split[0]
                            ).getDate();

                            return (
                                <div className="calendarCell inactive" key={i}>
                                    <span>{date}</span>
                                </div>
                            );
                        } else {
                            let split = data.date.split("/").map(str => {
                                return parseInt(str);
                            });
                            const date = new Date(
                                split[2],
                                split[1] - 1,
                                split[0]
                            ).getDate();
                            const hasClassHasSelected = data.hasClass.filter(info => {
                                return info.selected;
                            });
                            const selected = hasClassHasSelected.length ? true : false;
                            return (
                                <CalendarCellWithClassInfo
                                    data={data}
                                    date={date}
                                    index={i}
                                    selected={selected}
                                    key={i}
                                    monthKey={this.props.monthKey}
                                />
                            );
                        }
                    })}
                </div>
            </div>
        );
    };

    render() {
        const calendarInfo = this.props.calendarInfo;
        return (
            <div>{calendarInfo ? this.paintCalendar(calendarInfo) : null}</div>
        );
    }
}

export default Calendar;
