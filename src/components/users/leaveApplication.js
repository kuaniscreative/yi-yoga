import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

// components
import AllClasses from './allClasses';

class LeaveApplication extends Component {

    state = {
        leaveDate: {}
    }

    setLeaveDate = (date) => {
        this.setState({
            leaveDate: date
        })
    }

    submit = () => {
        console.log(this.state.leaveDate);
    }

    render() {
        console.log(this.state)
        return (
            <div id='leaveApplication'>
               <AllClasses setLeaveDate={this.setLeaveDate} /> 
               <button onClick={this.submit}>確認</button>   
               <Link to='/'>取消</Link>          
            </div>
        )
    } 
}

export default compose(
    connect(),
    firestoreConnect([
        { collection: 'classProfile'}, { collection: 'user'}
    ])
)(LeaveApplication)