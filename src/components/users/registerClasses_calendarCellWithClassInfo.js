import React, { Component } from 'react';
import { connect } from 'react-redux';

class CalendarCellWithClassInfo extends Component {
    
    useClassNameToSetActive = () => {
        return this.props.selected ? 'calendarCell selected' : 'calendarCell'
    }
    
    handleClick = () => {
        const indexOfCalendarInfo = this.props.index
        const data = {
            hasClass: this.props.data.hasClass,
            indexOfCalendarInfo: indexOfCalendarInfo,
            calendar: this.props.monthKey
        }
        this.props.openSelectTimeModal(data)
    }

    render() {
        return (
            <div className={this.useClassNameToSetActive()} data-date={this.props.data.date} onClick={this.handleClick}>
                <span>{this.props.date}</span>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openSelectTimeModal: (data) => {
            dispatch({type: 'OPEN_SELECT_TIME_MODAL', data: data})
        }
    }
}

export default connect(null, mapDispatchToProps)(CalendarCellWithClassInfo)