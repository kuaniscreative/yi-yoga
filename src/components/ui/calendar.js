import React, { Component } from 'react';

class Calendar extends Component {

    createCalendar = (month, year) => {
        const date = new Date(year, month, 1);
        const daysInMonth = () => {
            return 32 - new Date(year, month, 32).getDate();
        }
        const howManyCell = () => {
            const startDay = date.getDay();
            const modulo = daysInMonth() % 7;
            const base = parseInt(daysInMonth() / 7);
            if (startDay === 0 && modulo === 0) {
                return base * 7
            } else if (startDay > 0 && modulo + startDay > 7) {
                return (base + 2) * 7 
            } else {
                return (base + 1) * 7
            }
            
        }
        const cell = (howMany) => {
            const arr = []
            for (let i = 0; i < howMany; i++) {
                arr.push(i)
            }
            return arr
        }
        return (
            <div className='calendar'>
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
                        cell(howManyCell()).map((el, i) => {
                            const startpoint = date.getDay();
                            const dateOuput = i - startpoint + 1;
                            if (i < startpoint) {
                                return <div className='calendarCell' key={i}></div>
                            } else if (dateOuput > daysInMonth()) {
                                return <div className='calendarCell' key={i}></div>
                            } else {
                                return (
                                    <div className='calendarCell' data-date={`${dateOuput}/${month + 1}/${year}`} key={i}>
                                        <div>{dateOuput}</div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.createCalendar(1, 2019)}
            </div>
        )
    }
}

export default Calendar