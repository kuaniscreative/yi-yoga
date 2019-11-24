import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import CalendarCellWithClassInfo from './registerClasses_calendarCellWithClassInfo';

class Calendar extends Component {

    paintCalendar = (calendarInfo) => {
        const className = `calendar ${this.props.className}`;
        return (
            <div className={className}>
                <div className="weekDay calendarCellWrapper">
                    <div className='calendarCell'>日</div>
                    <div className='calendarCell'>一</div>
                    <div className='calendarCell'>二</div>
                    <div className='calendarCell'>三</div>
                    <div className='calendarCell'>四</div>
                    <div className='calendarCell'>五</div>
                    <div className='calendarCell'>六</div>
                </div>
                <div className='calenderDay calendarCellWrapper'>
                    {
                         calendarInfo.map((data, i) => {
                            
                            if (!data.date) {
                                return <div className='calendarCell' key={i}></div>
                            } else if (!data.hasClass) {
                                let split = data.date.split('/').map((str) => {
                                    return parseInt(str)
                                });
                                const date = new Date(split[2], split[1] - 1, split [0]).getDate();

                                return <div className='calendarCell inactive' key={i}>{date}</div>
                            } else {
                                let split = data.date.split('/').map((str) => {
                                    return parseInt(str)
                                });
                                const date = new Date(split[2], split[1] - 1, split [0]).getDate();

                                return <CalendarCellWithClassInfo data={data} date={date} index={i} key={i}/>
                               
                            }
                        })
                    }
                </div>
            </div>
        )
    }

    render() {
        const calendarInfo = this.props.calendarInfo;
        return (
            <div>
                {calendarInfo ? this.paintCalendar(calendarInfo) : null}
            </div>
        )
    }
}




export default Calendar