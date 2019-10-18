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

    submit = () => {
        console.log(this.state.leaveDate);
        this.props.leaveApplication(this.state.leaveDate, this.props.userId);
    }

    render() {
        
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
    return {
        userId: state.firebase.auth.uid,
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