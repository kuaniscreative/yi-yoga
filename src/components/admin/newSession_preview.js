import React, { Component } from 'react';

// components
import DayList from './newSession_preview--dayList';

class NewSessionPreview extends Component {
    render() {
        // props received from newSession.js 
        const classes = this.props.classes;
        const classesMon = classes.filter((classDate) => {
            return classDate.getDay() === 1
        });
        const classesTue = classes.filter((classDate) => {
            return classDate.getDay() === 2
        });
        const classesThu = classes.filter((classDate) => {
            return classDate.getDay() === 4
        });
        const classesFri = classes.filter((classDate) => {
            return classDate.getDay() === 5
        });

        const dayList = (arr, day) => {
            return (
                <DayList classes={arr} deleteClassWhenPreview={this.props.deleteClassWhenPreview} day={day} />
            )
        }
        return (
            <div>
                <h2>預覽</h2>
                { dayList(classesMon, 1) }
                { dayList(classesTue, 2) }
                { dayList(classesThu, 4) }
                { dayList(classesFri, 5) }
            </div>
        )
    }
}

export default NewSessionPreview