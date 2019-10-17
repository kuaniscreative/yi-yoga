import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

// components 
import NewSessionForm from './newSession_form';
import NewSessionPreview from './newSession_preview';

// actions
import { registerSession, addClassProfile } from '../../actions/adminActions';

// functions
import { uidGenerator } from '../../functions/uid';

class NewSession extends Component {


    state = {
        period: [],
        classes: [],
        regularSession: [
            {day: 1, hour: 19, minute: 20},
            {day: 1, hour: 20, minute: 30},
            {day: 2, hour: 19, minute: 20},
            {day: 2, hour: 20, minute: 30},
            {day: 4, hour: 18, minute: 50},
            {day: 5, hour: 19, minute: 20}
        ],
        periodInputIsValid: true
    }

    getSession = (start, end) => {
        const startDate = new Date(start.year, start.month - 1, 1);
        const endDate = new Date(end.year, end.month, 0);
        const regularSession = this.state.regularSession;
        const targets = []
        const currentSessions = this.props.sessions; 
        const checkValidPeriod = () => {
            for (let session of currentSessions) {
                for (let period of session.period) {
                    if (period.year === start.year && period.month === start.month) {
                        return false
                    } 
                    if (period.year === end.year && period.month === end.month) {
                        return false
                    }
                }
            }
            return true
        }

        if (checkValidPeriod()) {
            // get the classes and push them to targets
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
        } 
        return targets
    }

    setSessionPeriod = (start, end) => {
        const classes = this.getSession(start, end);
        if (classes.length === 0) {
            this.setState({
                ...this.state,
                periodInputIsValid: false
            })
        } else {
            this.setState({
                ...this.state,
                period: [start, end],
                classes: classes
            })
        }
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
        const sessionInfo = {
            period: this.state.period,
            classes: this.state.classes
        }
        // this.props.registerSession(sessionInfo)
        this.props.addClassProfile(this.state.classes);
    }

    render() {
        const newSessionProcesser = this.state.classes.length ? 
            <NewSessionPreview classes={this.state.classes} deleteClassWhenPreview={this.deleteClassWhenPreview} addSession={this.addSession} /> :
            <NewSessionForm setSessionPeriod={this.setSessionPeriod} validPeriod={this.state.periodInputIsValid} />;
        
        return (
            <div>
                {
                    newSessionProcesser
                }              
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    return {
        sessions: state.firestore.ordered.newSession,
        newSessionIsAdded: state.admin.newSessionIsAdded,
        classProfile: state.firestore.ordered.classProfile

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerSession: (session) => {
            dispatch(registerSession(session))
        },
        addClassProfile: (classes) => {
            dispatch(addClassProfile(classes))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'newSession'}, {collection: 'classProfile'}
    ])
    )(NewSession)