import React, { Component } from 'react';

class MonthSection extends Component {
    render() {

        return (
            <div>
                <h2>{`${this.props.classes[0].getMonth()}月`}</h2>
                {
                    this.props.classes.map((date, i) => {
                        return (
                            <p key={i}>{`${date.getDate()}日`}</p>
                        )
                    })
                }
            </div>
        )
    }
}

export default MonthSection