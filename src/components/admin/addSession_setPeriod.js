import React, { Component } from "react";

class SetPeriod extends Component {

    state = {
        start: {
            month: '',
            year: ''
        },
        end: {
            month: '',
            year: ''
        }, 
        validPeriod: true
    }

    handleChange = e => {
        // start or end
        const point = e.target.dataset.point;
        // year or month
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            ...this.state,
            [point]: {
                ...this.state[point],
                [name]: parseInt(value, 10)
            }
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // check if the input date is valid
        const sMonth = typeof this.state.start.month === 'number' ? this.state.start.month : null;
        const eMonth = typeof this.state.end.month === 'number' ? this.state.end.month : null;
        const sYear = typeof this.state.start.year === 'number' ? this.state.start.year : null;
        const eYear = typeof this.state.end.year === 'number' ? this.state.end.year : null;
        const validYear = eYear >= sYear;
        const validPeriod = validYear && eMonth >= sMonth ? true : false;
        
        // excute setSessionPeriod from props passed from newSession.js 
        if (validPeriod) {
            console.log('yeah good');
            // this.props.setSessionPeriod(this.state.start, this.state.end)
        } else {
            this.setState({
                ...this.state,
                validPeriod: false
            })
        }
        
    }

    yearOptionList = point => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const options = [];
        for (let i = 0; i < 3; i++) {
            options.push(currentYear + i);
        }
        return (
            <select name="year" data-point={point} onChange={this.handleChange}>
                <option value="">----</option>
                {options.map(option => {
                    return (
                        <option value={option} key={option}>
                            {option}
                        </option>
                    );
                })}
            </select>
        );
    };

    monthOptionList = point => {
        const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        return (
            <select
                name="month"
                data-point={point}
                onChange={this.handleChange}
            >
                <option value="">--</option>
                {options.map(option => {
                    return (
                        <option value={option} key={option}>
                            {option}
                        </option>
                    );
                })}
            </select>
        );
    };
    render() {
        return (
            <div>
                {/* {this.props.validPeriod ? null : <p>時間重複</p>} */}
                <form action="" onSubmit={this.handleSubmit}>
                    <label htmlFor="start">開始月份</label>
                    {this.yearOptionList("start")}
                    {this.monthOptionList("start")}
                    <label htmlFor="end">結束月份</label>
                    {this.yearOptionList("end")}
                    {this.monthOptionList("end")}
                    <button>確認</button>
                    {this.state.validPeriod ? null : <div>時間設定有誤</div>}
                </form>
            </div>
        );
    }
}

export default SetPeriod;
