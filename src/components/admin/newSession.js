import React, { Component } from 'react';

// components 
import NewSessionForm from './newSession_form';

class NewSession extends Component {


    state = {
        period: {}
    }

    setSessionPeriod = (start, end) => {
        this.setState({
            ...this.state,
            period: {
                start: {
                    month: start.month,
                    year: start.year
                },
                end: {
                    month: end.month,
                    year: end.year
                }
            }
        })
    }

    getSession = () => {
        const start = new Date(2019, 9, 1);
        const end = new Date(2019, 10, 30);
        const dayOfWeek = 1;
        const targets = [];
        while(start.valueOf() !== end.valueOf()) {
            
            if (start.getDay() === dayOfWeek) {
                targets.push(new Date(start.valueOf()));
            }
            start.setDate(start.getDate() + 1);
            
        }
        console.log(targets);
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <NewSessionForm setSessionPeriod={this.setSessionPeriod} />
                <button onClick={this.getSession}>New Session</button>
            </div>
        )
    }
}

export default NewSession