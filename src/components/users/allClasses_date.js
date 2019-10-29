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
        console.log(this.props.classSingle.toDate())
        const yyyy = this.props.classSingle.toDate().getFullYear();
        const mm = this.props.classSingle.toDate().getMonth();
        const dd = this.props.classSingle.toDate().getDate();
        const hr = this.props.classSingle.toDate().getHours();
        const min = this.props.classSingle.toDate().getMinutes();
        const startAt = `${hr}:${min}`;
        const day = this.props.classSingle.toDate().getDay();
        const dayOutput = `週${day.toLocaleString('zh-u-nu-hanidec')}`
        
        return (
            <div onClick={this.handleClick} className='dateHero'>
                <span name='date'>{`${dd}`}</span>
                <span name='monthYear'>{`${mm + 1}月 ${yyyy}`}</span>
                <span name='seperator'> | </span>
                <span name='dayTime'>{`${dayOutput} ${startAt}`}</span>
                {this.state.selected ? <span>已選取</span> : null}
            </div>
        )
    }
}

export default DateSingle