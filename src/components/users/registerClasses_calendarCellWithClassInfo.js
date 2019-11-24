import React, { Component } from 'react';
import { connect } from 'react-redux';

class CalendarCellWithClassInfo extends Component {
    
    handleClick = () => {
        const indexOfCalendarInfo = this.props.index
        const data = {
            hasClass: this.props.data.hasClass,
            indexOfCalendarInfo: indexOfCalendarInfo
        }
        this.props.openSelectTimeModal(data)
    }

    render() {
        return (
            <div className='calendarCell' data-date={this.props.data.date} onClick={this.handleClick}>
                {this.props.date}
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