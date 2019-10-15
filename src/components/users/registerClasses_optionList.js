import React, { Component } from 'react';

class OptionList extends Component {
    render() {

        const classes = this.props.classes && this.props.classes.map((timestamp) => {
            return timestamp.toDate()
        });
        
        const sortClasess = () => {
            const sorted = [];
            if (classes) {
                for (let i = 0; i < 7; i ++) {
                    const byDay = classes.filter((date) => {
                        return date.getDay() === i
                    })
                    if (byDay.length) {
                        sorted[i] = byDay
                    } else {
                        sorted[i] = null;
                    }
                }
            }
            return sorted;
        }
        
        const sortedClasses = sortClasess();
        

        return (
            <div>
                {
                    sortedClasses.map((dayArr, i) => {
                        if (dayArr) {
                            return <div key={i}>{`星期${i}有${dayArr.length}堂課`}</div>
                        }
                        
                    })
                }
            </div>
        )
    }
}

export default OptionList