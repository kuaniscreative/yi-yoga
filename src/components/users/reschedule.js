import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class Reschedule extends Component {

    requestTimeTable = (classStamp) => {
        const split = classStamp.split('/');
        const yyyy = split[0];
        const mm = parseInt(split[1], 10);
        console.log(`請求${yyyy}.${mm} - ${(mm + 1) % 12}的課表`)
    }

    render() {
        return (
            <div id='reschedule'>
               補課安排
               { this.props.reschedulable && this.props.reschedulable.map((classSingle, i) => {
                    return (
                        <div key={i}>
                            {classSingle}
                            <button onClick={() => {this.requestTimeTable(classSingle)}}>補課</button>
                        </div>
                    )
               })}  
               <Link to='/'>取消</Link>               
            </div>
        )
    } 
}

const mapStateToProps = (state) => {
    const uid = state.firebase.auth.isempty ? undefined : state.firebase.auth.uid;
    const userData = uid && state.firestore.ordered.user ? state.firestore.ordered.user.find((user) => {
        return user.id === uid
    }) : {};
    return {
        reschedulable: userData.reschedulable
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'user'}, {collection:'classProfile'}
    ])
)(Reschedule)