import React, { Component } from 'react';

// components
import ListByDay from './reschedule_preview_classList';

class Preview extends Component {

    handleClick = (e) => {
        e.preventDefault();
        console.log('date selected')
        console.log('if there are seats, the student will be registered as rescheduled');
        console.log('if not, it will be pending');
    }
    render() {
        console.log(this.props.classes)
        return (
            <div>
                {
                    this.props.classes.map((dayArr, i) => {
                        if (dayArr.length) {
                            return <ListByDay key={i} classes={dayArr} />
                        } else {
                            return null
                        }
                    })
                }
            </div>
        )
    }
}

export default Preview;