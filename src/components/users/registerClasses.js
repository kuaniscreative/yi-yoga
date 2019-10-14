import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class RegisterClasses extends Component {
    render() {
        
        return (
            <div>
                報名課程
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        session: state.firestore.ordered.newSession
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'newSession'}
    ])
)(RegisterClasses)