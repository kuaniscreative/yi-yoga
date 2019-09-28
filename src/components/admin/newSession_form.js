import React, { Component } from 'react';

class NewSessionForm extends Component {
    
    state = {
        start: {
            month: '',
            year: ''
        },
        end: {
            month: '',
            year: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
    }

    handleChange = (e) => {
        // start or end
        const point = e.target.dataset.point;
        // year or month
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            ...this.state,
            [point]: {
                ...this.state[point],
                [name]: value
            }
        })
    }

    render() {
        console.log(this.state);
        const yearOptionList = (point) => {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const options = [];
            for (let i = 0; i < 3; i++) {
                options.push(currentYear + i);
            }
            return (
                <select name="year" data-point={point} onChange={this.handleChange}>
                    <option value="">----</option>
                    {
                        options.map((option) => {
                            return (
                                <option value={option} key={option}>{option}</option>
                            )
                        })
                    }
                </select>
            )
        }

        const monthOptionList = (point) => {
            const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            return (
                <select name="month" data-point={point} onChange={this.handleChange}>
                    <option value="">--</option>
                    {
                        options.map((option) => {
                            return (
                                <option value={option} key={option}>{option}</option>
                            )
                        })
                    }
                </select>
            )
            
        }

        return (
            <form action="" onSubmit={this.handleSubmit}>
                <label htmlFor="start">開始月份</label>
                { yearOptionList('start') }
                { monthOptionList('start') }
                <label htmlFor="end">結束月份</label>
                { yearOptionList('end') }
                { monthOptionList('end') }
                <button>確認</button>
            </form>
        )
    }
}

export default NewSessionForm;