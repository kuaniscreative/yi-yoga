import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

// components
import OptionList from './registerClasses_optionList';

class RegisterClasses extends Component {

    state = {
        selected: []
    }

    handleChange = (e) => {
        let selected = this.state.selected;
        const inputValue = e.target.value;
        if (selected.indexOf(inputValue) > -1) {
            selected = selected.filter((item) => {
                return item !== inputValue
            })
        } else {
            selected.push(inputValue)
        }
        this.setState({
            selected: selected
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitted')
    }

    render() {
        const session = this.props.session ? this.props.session[0].sortedByCourse : null;
        return (
            <form onSubmit={this.handleSubmit}>
                {
                    session && session.map((item, i) => {
                        return (
                            <div key={i}>
                                <input type="checkbox" name={item.name} value={item.name} onChange={this.handleChange} /> {`${item.name} 共${item.length}堂`}
                            </div>  
                        )
                    })
                }
                <button>確認</button>
            </form>
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