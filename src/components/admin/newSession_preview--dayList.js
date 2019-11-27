import React, { Component } from 'react';

// components
import ClassSingle from './newSession_preview--classSingle';

class DayList extends Component {
    render() {
        const classes = this.props.classes;
 
        return (
            <div>
                {
                    classes.length ? classes.map((info, i) => {
                        return (
                            <ClassSingle class={info.date} deleteClassWhenPreview={this.props.deleteClassWhenPreview} key={i} />
                        )
                    }) : null
                }
            </div>
        )
    }
} 

export default DayList