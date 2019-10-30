import React, { Component } from 'react';

// components
import DateSingle from './leaveApplication_classSingle';

// functions

class ClassList extends Component {

    render() {
    
        return (
            <div className='centerList'>
                {
                    this.props.classes && this.props.classes.map((date, i) => {
                        return <DateSingle classSingle={date} key={i} submit={this.props.submit} />
                    })
                }
            </div>
        )
    }
}

export default ClassList 