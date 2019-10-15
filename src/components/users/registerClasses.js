import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

// components
import OptionList from './registerClasses_optionList';

class RegisterClasses extends Component {
    render() {
        const session = this.props.session ? this.props.session[0].sortedByCourse : null;
        return (
            <div>
                {
                    session && session.map((item, i) => {
                        return (
                            <div key={i}>
                                <p>{item.name}</p>
                                <p>{`共${item.length}堂`}</p>
                            </div>
                        )
                    })
                }
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