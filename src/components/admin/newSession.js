import React, { Component } from 'react';
import { connect } from 'react-redux';

// components 
import NewSessionForm from './newSession_form';
import NewSessionPreview from './newSession_preview';

// actions
import { registerSession } from '../../actions/admin';

// functions
import { uidGenerator } from '../../functions/uid';

class NewSession extends Component {


    state = {
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
        const targets = []
        while(startDate.valueOf() !== endDate.valueOf()) {
            switch (startDate.getDay()) {
                case 1: 
                    (() => {
                        let t = regularSession.filter((item) => {
                            return item.day === 1
                        });
                        t.forEach((item) => {
                            const d = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), item.hour, item.minute);
                            d.id = uidGenerator();
                            targets.push(d);
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
                            d.id = uidGenerator();
                            targets.push(d);
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
                            d.id = uidGenerator();
                            targets.push(d);
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
                            d.id = uidGenerator();
                            targets.push(d);
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

    deleteClassWhenPreview = (id) => {
        const classes = this.state.classes.filter((classSingle) => {
            return classSingle.id !== id
        })
        this.setState({
            ...this.state,
            classes: classes
        })
    }
    
    addSession = () => {
        this.props.registerSession(this.state.classes)
    }

    render() {
        return (
            <div>
                {
                    this.state.classes ? 
                    <NewSessionPreview classes={this.state.classes} deleteClassWhenPreview={this.deleteClassWhenPreview} addSession={this.addSession} /> :
                    <NewSessionForm setSessionPeriod={this.setSessionPeriod} /> 
                }
                
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerSession: (classes) => {
            dispatch(registerSession(classes))
        }
    }
}

export default connect(null, mapDispatchToProps)(NewSession)