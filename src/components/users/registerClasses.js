import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

// components
import OptionList from './registerClasses_optionList';

class RegisterClasses extends Component {
    render() {
        
        const classes = this.props.session ? this.props.session[0].classes : null;

        return (
            <div>
                <OptionList classes={classes}/>
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