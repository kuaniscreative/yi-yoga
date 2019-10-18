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
        const yyyy = this.props.classSingle.toDate().getFullYear();
        const mm = this.props.classSingle.toDate().getMonth();
        const dd = this.props.classSingle.toDate().getDate();
        
        return (
            <div onClick={this.handleClick}>
                <span>{`${yyyy}年`}</span>
                <span>{`${mm + 1}月`}</span>
                <span>{`${dd}日`}</span>
                <span></span>
                {this.state.selected ? <span>已選取</span> : null}
            </div>
        )
    }
}

export default DateSingle