import React, { Component } from "react";

// components
import DayList from "./newSession_preview--dayList";
import StepIndicator from "../stepIndicator";
import NextStepButtonsArea from "../ui/nextStepButtonArea";

class NewSessionPreview extends Component {
    render() {
        // props received from newSession.js
        const classes = this.props.classes;
        const classesMon = classes.filter(classInfo => {
            return classInfo.date.getDay() === 1;
        });
        const classesTue = classes.filter(classInfo => {
            return classInfo.date.getDay() === 2;
        });
        const classesThu = classes.filter(classInfo => {
            return classInfo.date.getDay() === 4;
        });
        const classesFri = classes.filter(classInfo => {
            return classInfo.date.getDay() === 5;
        });

        const dayList = (arr, day) => {
            return (
                <DayList
                    classes={arr}
                    deleteClassWhenPreview={this.props.deleteClassWhenPreview}
                    day={day}
                />
            );
        };
        return (
            <div id="newSession_preview">
                <div className='newSession_instruction layout_contentBlock'>
                    <StepIndicator indicator="課程預覽" />
                    <ul className="comfyList">
                        <li>如果有特定日期不開放課程，可以在這裡移除</li>
                    </ul>
                </div>
                {dayList(classesMon, 1)}
                {dayList(classesTue, 2)}
                {dayList(classesThu, 4)}
                {dayList(classesFri, 5)}
                <NextStepButtonsArea
                    actionName="報名開放"
                    action={this.props.addSession}
                    cancelName="上一步"
                    cancel={this.props.clearSessionInfo}
                />
            </div>
        );
    }
}

export default NewSessionPreview;
