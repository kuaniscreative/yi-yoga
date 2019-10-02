import React, { Component } from 'react';

// components
import ClassSingle from './newSession_preview--classSingle';

class DayList extends Component {
    render() {
        const classes = this.props.classes;
        const title = () => {
            switch(classes[0].getDay()) {
                case 0 :
                    return '星期日'
                case 1 :
                    return '星期一'
                case 2 :
                    return '星期二'
                case 3 :
                    return '星期三'
                case 4 :
                    return '星期四'
                case 5 :
                    return '星期五'
                case 6 :
                    return '星期六'
            }
        }
        return (
            <div>
                <h3>{ title() }</h3>
                {
                    classes.map((date, i) => {
                        return (
                            <ClassSingle class={date} key={i} />
                        )
                    })
                }
            </div>
        )
    }
} 

export default DayList