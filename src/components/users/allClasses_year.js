import React, { Component } from 'react';

// components
import MonthSection from './allClasses_month';

class YearSection extends Component {
    render() {

        const year = this.props.classes[0][0].getFullYear();
        return (
            <div>
                <h2>{year}年</h2>
                {
                    this.props.classes.map((month, i) => {
                        return <MonthSection key={i} classes={month}/>
                    })
                }
            </div>
        )
    }
}

export default YearSection