import React, { Component } from 'react';

// components 
import NewSessionForm from './newSession_form';

class NewSession extends Component {


    state = {
        classes: {},
        regularSession: [
            {day: 1, hour: 19, minute: 20},
            {day: 1, hour: 20, minute: 30},
            {day: 2, hour: 19, minute: 20},
            {day: 2, hour: 20, minute: 30},
            {day: 4, hour: 18, minute: 50},
            {day: 5, hour: 19, minute: 20}
        ]
    }

    getSession = (start, end) => {
        const startDate = new Date(start.year, start.month - 1, 1);
        const endDate = new Date(end.year, end.month, 0);
        const regularSession = this.state.regularSession;
        const targets = {
            mon: [],
            tue: [],
            wed: [],
            thu: [],
            fri: []
        };
        while(startDate.valueOf() !== endDate.valueOf()) {
            switch (startDate.getDay()) {
                case 1: 
                    (() => {
                        let t = regularSession.filter((item) => {
                            return item.day === 1
                        });
                        t.forEach((item) => {
                            const d = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), item.hour, item.minute);
                            targets.mon.push(d);
                        });
                    })();
                    break
                case 2: 
                    (() => {
                        let t = regularSession.filter((item) => {
                            return item.day === 2
                        });
                        t.forEach((item) => {
                            const d = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), item.hour, item.minute);
                            targets.tue.push(d);
                        });
                    })();
                    break
                case 4: 
                    (() => {
                        let t = regularSession.filter((item) => {
                            return item.day === 4
                        });
                        t.forEach((item) => {
                            const d = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), item.hour, item.minute);
                            targets.thu.push(d);
                        });
                    })();
                    break
                case 5: 
                    (() => {
                        let t = regularSession.filter((item) => {
                            return item.day === 5
                        });
                        t.forEach((item) => {
                            const d = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), item.hour, item.minute);
                            targets.fri.push(d);
                        });
                    })();
                    break
            }
            
            startDate.setDate(startDate.getDate() + 1);
            
        }
        return targets
    }

    setSessionPeriod = (start, end) => {

        const classes = this.getSession(start, end);
        this.setState({
            ...this.state,
            classes: classes
        })
    }


    render() {
        console.log(this.state);
        return (
            <div>
                <NewSessionForm setSessionPeriod={this.setSessionPeriod} />
                <button onClick={() => {console.log('depricated')}}>New Session</button>
            </div>
        )
    }
}

export default NewSession