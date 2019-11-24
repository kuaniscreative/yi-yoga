import React, { Component } from 'react';
import { connect } from 'react-redux';

class CalendarCellWithClassInfo extends Component {
    
    render() {
        return (
            <div className='calendarCell' data-date={this.props.data.date} onClick={() => {this.props.openSelectTimeModal(this.props.data.hasClass)}}>
                {this.props.date}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openSelectTimeModal: (options) => {
            dispatch({type: 'OPEN_SELECT_TIME_MODAL', options: options})
        }
    }
}

export default connect(null, mapDispatchToProps)(CalendarCellWithClassInfo)