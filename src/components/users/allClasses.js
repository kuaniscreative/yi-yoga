import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'

class AllClasses extends Component {

    

    render() {
        
        return (
            <div>
                <div>
                    <div>title</div>
                    <div>classes date</div>
                    <div>classes date</div>
                </div>

                <div>
                    <div>title</div>
                    <div>classes date</div>
                    <div>classes date</div>
                </div>

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
       classes: userData.allClasses || []
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'user'}
    ])
)(AllClasses);