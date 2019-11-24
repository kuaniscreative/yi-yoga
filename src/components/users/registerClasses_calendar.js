import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import CalendarCellWithClassInfo from './registerClasses_calendarCellWithClassInfo';

class Calendar extends Component {

    componentDidMount() {
        const dateInfos = this.generateDateInfo(0, 2020);
        const cellDatas = this.appendClassInfo(dateInfos, this.props.classes);
        this.props.send(cellDatas);
    }

    generateDateInfo = (month, year) => {
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

        const dateInfo = [];

        for (let i = 0; i < howManyCell(); i ++) {
            const startpoint = date.getDay();
            const dateOuput = i - startpoint + 1;
            const newDate = new Date(year, month, dateOuput);
            if (i < startpoint || dateOuput > daysInMonth()) {
                dateInfo.push({
                    date: null
                })
            } else {
                dateInfo.push({
                    date: newDate.toLocaleDateString(),
                })
            }
        }

        return dateInfo
    }

    appendClassInfo = (dateInfos, classes) => {
        const result = dateInfos.map((info) => {
            const mappedClasses = classes.map((timestamp) => {
                return {
                    dateString: timestamp.toDate().toLocaleDateString(),
                    date: timestamp.toDate()
                }
            })
            const matched = mappedClasses.filter((obj) => {
                return obj.dateString === info.date
            })
            if (matched.length) {
                return {
                    ...info,
                    hasClass: matched.map((obj) => {
                        return {
                            date: obj.date,
                            selected: false
                        }
                    })
                }
            } else {
                return {
                    ...info
                }
            }
            
        })
        return result
    }

    paintCalendar = (month, year, classes) => {
        const dateInfos = this.generateDateInfo(month, year);
        const cellDatas = this.appendClassInfo(dateInfos, classes);
        console.log(cellDatas)
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
                        cellDatas.map((data, i) => {
                            
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
        console.log('infos: ', this.props.infos)
        const classes = this.props.classes;
        return (
            <div>
                {this.paintCalendar(0, 2020, classes)}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        infos: state.registerClass.infos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        send: (infos) => {
            dispatch({type: 'SEND', infos})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)