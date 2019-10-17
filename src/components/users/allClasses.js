import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

// components
import YearSection from './allClasses_year';

// functions
import { sortByMonth } from '../../functions/dateFunctions';

class AllClasses extends Component {

    

    render() {
        
        const classes = this.props.classes.length ? sortByMonth(this.props.classes) : [];


        return (
            <div>
                {
                    classes.map((year, i) => {
                        return <YearSection classes={year} key={i} />
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