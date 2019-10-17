import React, { Component } from "react";

// components 
import DateSingle from './allClasses_date';

class MonthSection extends Component {
    handleClick = e => {
        console.log(e.target.dataset.date);
    };

    render() {
        return (
            <div>
                <h2>{`${this.props.classes[0].getMonth()}月`}</h2>
                {this.props.classes.map((date, i) => {
                    return (
                        <DateSingle key={i} classSingle={date} />
                    );
                })}
            </div>
        );
    }
}

export default MonthSection;
