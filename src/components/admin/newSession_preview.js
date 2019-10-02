import React, { Component } from 'react';

// components
import DayList from './newSession_preview--dayList';

class NewSessionPreview extends Component {
    render() {
        // props received from newSession.js 
        // structure: classes: { mon:[date{}, date{}] }
        const classes = this.props.classes;
        const days = Object.keys(classes);
        return (
            <div>
                <h2>預覽</h2>
                {
                    days.map((day, i) => {
                        return classes[day].length ? (
                            <DayList classes={classes[day]} key={i} />
                        ) : null
                    })
                }
            </div>
        )
    }
}

export default NewSessionPreview