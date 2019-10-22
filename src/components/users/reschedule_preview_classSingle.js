import React, { Component } from 'react';

// functions 
import { dateOutput } from '../../functions/dateFunctions';

class ClassSingle extends Component {

    handleClick = () => {
        console.log('selected!');
    }

    render() {

        const output = dateOutput(this.props.classInfo.classDate);
    
        return (
            <div>
                {
                    `${output.yyyy}.${output.mm}.${output.dd} ${output.startAtHour}:${output.startAtMin}`
                }
                <button onClick={this.handleClick}>確認</button>
            </div>
        )
    }
}

export default ClassSingle