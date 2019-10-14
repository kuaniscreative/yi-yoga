import React, { Component } from 'react';

class OptionList extends Component {
    render() {

        const classes = this.props.classes && this.props.classes.map((timestamp) => {
            return timestamp.toDate()
        });
        
        

        return (
            <div>
                很多東西
            </div>
        )
    }
}

export default OptionList