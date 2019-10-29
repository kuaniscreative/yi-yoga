import React, { Component } from 'react';

// components
import ListByDay from './reschedule_preview_classList';
import ClassSingle from './reschedule_preview_classSingle';

class Preview extends Component {

    render() {
        return (
            <div>
                {
                    this.props.classes.map((classSingle, i) => {
                        return <ClassSingle classSingle={classSingle} key={i} select={this.props.select}/>
                    })
                }
            </div>
        )
    }
}

export default Preview;