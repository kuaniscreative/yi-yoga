import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

// components
import YearSection from './allClasses_year';
import DateSingle from './allClasses_date';

// functions
import { sortByMonth } from '../../functions/dateFunctions';

class AllClasses extends Component {

    render() {
    
        return (
            <div>
                {
                    this.props.classes.map((date, i) => {
                        return <DateSingle classSingle={date} key={i} submit={this.props.submit} />
                    })
                }

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