import React, { Component } from "react";

// components
import StepIndicator from "../stepIndicator";
import Calendar from './registerClasses_calendar';
import SelectTimeModal from './registerClasses_selectTimeModal';

class SelectClassPanel extends Component {

    render() {
        return (
            <div id='selectClassPanel'>
                <ul className='comfyList'>
                    <li>請在日曆上選取本期想要上課的所有課程</li>
                    <li>你也可以透過下方的按鈕一次選取</li>
                </ul>
                <StepIndicator
                    indicator="step.1 選取課堂"
                    className="actionCard_content"
                />
                <Calendar classes={this.props.classes}/>
                <SelectTimeModal />
            </div>
        );
    }
}



export default SelectClassPanel;
