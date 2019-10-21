import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

// components
import AllClasses from './allClasses';

// actions
import { leaveApplication } from '../../actions/userActions';

class LeaveApplication extends Component {

    state = {
        leaveDate: {}
    }

    setLeaveDate = (date) => {
        this.setState({
            leaveDate: date
        })
    }

    checkLeaveRecord = (date) => {
        const checker = `${date.getFullYear()}/${date.getMonth() + 1}`;
        if (this.props.leaveRecord && this.props.leaveRecord.indexOf(checker) > -1) {
            return false
        }
        return true
    }

    submit = () => {
        const input = this.state.leaveDate;
        const canApply = this.checkLeaveRecord(input.toDate())
        if (canApply) {
            this.props.leaveApplication(input, this.props.userId);
        } else {
            console.log('you have already leave this month')
        }
        
    }

    render() {
        console.log(this.props)
        return (
            <div id='leaveApplication'>
               <AllClasses setLeaveDate={this.setLeaveDate} /> 
               <button onClick={this.submit}>確認</button>   
               <Link to='/'>取消</Link>          
            </div>
        )
    } 
}

const mapStateToProps = (state) => {
    const user = state.firestore.ordered.user ? state.firestore.ordered.user.find((user) => {
        return user.id === state.firebase.auth.uid 
    }) : null;

    return {
        userId: state.firebase.auth.uid,
        leaveRecord: user ? user.leaveRecord : null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        leaveApplication: (date, userId) => {
            dispatch(leaveApplication(date, userId));
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'classProfile'}, { collection: 'user'}
    ])
)(LeaveApplication)