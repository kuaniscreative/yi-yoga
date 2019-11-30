import React, { Component } from "react";

// components
import ClassList from "./reschedule_preview_classList";
import LeaveClassesList from "./reschedule_preview_LeaveClassesList";
import StepIndicator from "../stepIndicator";

class Preview extends Component {
    handleClick = () => {
        this.props.submit();
    };

    conditionalComponents = () => {
        if (this.props.classSelected) {
            return (
                <ClassList
                    classes={this.props.classes}
                    select={this.props.select}
                    submit={this.props.submit}
                    clearTimeTable={this.props.clearTimeTable}
                />
            );
        } else {
            return (
                <LeaveClassesList
                    leaveRecord={this.props.leaveRecord}
                    selectLeaveClass={this.props.selectLeaveClass}
                />
            );
        }
    };

    indicatorOutput = () => {
        return this.props.classSelected
            ? "step.2 選擇補課日期"
            : "step.1 點選已請假之課堂";
    };

    render() {
        return (
            <div id="reschedule_preview">
                <div id="reschedule_instruction">
                    <StepIndicator indicator={this.indicatorOutput()} />
                    {this.props.classSelected ? null : (
                        <ul className="comfyList">
                            <li>點選後將會顯示可補課的課程</li>
                        </ul>
                    )}
                </div>

                {this.conditionalComponents()}
            </div>
        );
    }
}

export default Preview;
