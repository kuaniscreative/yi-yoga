import React, { Component } from 'react';

class DateSingle extends Component {

    state = {
        selected: false
    }

    handleClick = () => {
        this.props.setLeaveDate(this.props.classSingle);
        this.setState({
            selected: !this.state.selected
        })
    }

    render() {
        console.log(this.state);
        return (
            <div onClick={this.handleClick}>
                <span>{`${this.props.classSingle.toDate().getDate()}日`}</span>
            </div>
        )
    }
}

export default DateSingle