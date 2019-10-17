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
            {day: 1, hour: 19, minute: 20, name: '星期一 19:20 - 20:20'},
            {day: 1, hour: 20, minute: 30, name: '星期一 20:30 - 21:30'},
            {day: 2, hour: 19, minute: 20, name: '星期二 19:10 - 20:10'},
            {day: 2, hour: 20, minute: 30, name: '星期二 20:30 - 21:30'},
            {day: 4, hour: 18, minute: 50, name: '星期四 18:50 - 19:50'},
            {day: 5, hour: 19, minute: 30, name: '星期五 19:30 - 20:30'}
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

    sortClassesByCourse = (classesArr) => {
        const regularSession = this.state.regularSession;
        const result = [];
        regularSession.forEach((regular) => {
            const name = regular.name;
            const match = [];
            classesArr.forEach((classSingle) => {
                if (regular.day === classSingle.getDay() && regular.hour === classSingle.getHours()) {
                    match.push(classSingle);
                }
            }) 
            result.push({
                name: name,
                classes: match,
                length: match.length
            })
        })
        return result
    }
    
    addSession = () => {
        
        const sessionInfo = {
            period: this.state.period,
            classes: this.state.classes,
            all: this.state.classes,
            sortedByCourse: this.sortClassesByCourse(this.state.classes)
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