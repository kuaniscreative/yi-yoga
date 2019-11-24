import React, { Component } from "react";
import { connect } from "react-redux";

// components
import StepIndicator from "../stepIndicator";
import Calendar from "./registerClasses_calendar";
import SelectTimeModal from "./registerClasses_selectTimeModal";

class SelectClassPanel extends Component {

    state = {
        inView: 0
    }

    componentDidMount() {
        const session = this.props.session;
        const span = session.span;
        const calendarInfo = {};
        span.forEach(stamp => {
            const mm = stamp.split("/")[0];
            const yyyy = stamp.split("/")[1];
            const date = new Date(yyyy, mm - 1);
            const key = date.toLocaleString("default", { month: "short" });
            const dateInfos = this.generateDateInfo(mm - 1, yyyy);
            const cellDatas = this.appendClassInfo(dateInfos, this.props.session.classes);

            calendarInfo[key] = cellDatas;
        });
        this.props.createCalendarInfo(calendarInfo);
    }

    generateDateInfo = (month, year) => {
        const date = new Date(year, month, 1);
        const daysInMonth = () => {
            return 32 - new Date(year, month, 32).getDate();
        };
        const howManyCell = () => {
            const startDay = date.getDay();
            const modulo = daysInMonth() % 7;
            const base = parseInt(daysInMonth() / 7);
            if (startDay === 0 && modulo === 0) {
                return base * 7;
            } else if (startDay > 0 && modulo + startDay > 7) {
                return (base + 2) * 7;
            } else {
                return (base + 1) * 7;
            }
        };

        const dateInfo = [];

        for (let i = 0; i < howManyCell(); i++) {
            const startpoint = date.getDay();
            const dateOuput = i - startpoint + 1;
            const newDate = new Date(year, month, dateOuput);
            if (i < startpoint || dateOuput > daysInMonth()) {
                dateInfo.push({
                    date: null
                });
            } else {
                dateInfo.push({
                    date: newDate.toLocaleDateString()
                });
            }
        }

        return dateInfo;
    };

    appendClassInfo = (dateInfos, classes) => {
        const result = dateInfos.map(info => {
            const mappedClasses = classes.map(timestamp => {
                return {
                    dateString: timestamp.toDate().toLocaleDateString(),
                    date: timestamp.toDate()
                };
            });
            const matched = mappedClasses.filter(obj => {
                return obj.dateString === info.date;
            });
            if (matched.length) {
                return {
                    ...info,
                    hasClass: matched.map(obj => {
                        return {
                            date: obj.date,
                            selected: false
                        };
                    })
                };
            } else {
                return {
                    ...info
                };
            }
        });
        return result;
    };

    setViewingCalendar = (index) => {
        this.setState({
            ...this.state,
            inView: index
        })
    }

    render() {
        const span = this.props.session.span;
        return (
            <div id="selectClassPanel">
                <ul className="comfyList">
                    <li>請在日曆上選取本期想要上課的所有課程</li>
                    <li>你也可以透過下方的按鈕一次選取</li>
                </ul>
                <StepIndicator
                    indicator="step.1 選取課堂"
                    className="actionCard_content"
                />

                {/**
                 *
                 *       月份按鈕
                 *
                 */}
                <div id="selectClass_monthSelectors">
                    {span.map((stamp, i) => {
                        const month = stamp.split("/")[0];
                        const output = `${month}月`;
                        const className = this.state.inView === i ? 'outlineButton inView' : 'outlineButton';
                        return (
                            <button className={className} key={i} onClick={() => {this.setViewingCalendar(i)}}>
                                {output}
                            </button>
                        );
                    })}
                </div>

                {/**
                 *
                 *       日曆
                 *
                 */}
                <div id="selectClass_calendars">
                    {
                        span.map((stamp, i) => {
                            const dateInfo = stamp.split('/');
                            const month = dateInfo[0];
                            const year = dateInfo[1];
                            const date = new Date(year, month - 1);
                            const key = date.toLocaleString("default", { month: "short" });
                            const calendarInfo = this.props.calendarInfos ? this.props.calendarInfos[key] : null;
                            const className = this.state.inView === i ? 'inView' : '';
                            return  <Calendar calendarInfo={calendarInfo} month={month} year={year} key={i} className={className}/>
                        })
                    }
                </div>

                {/**
                 *
                 *       日期確認彈窗
                 *
                 */}
                <SelectTimeModal />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        calendarInfos: state.registerClass.calendarInfos,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createCalendarInfo: infos => {
            dispatch({ type: "CREATE_CALENDAR_INFO", infos });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectClassPanel);
