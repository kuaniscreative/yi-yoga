import React, { Component } from 'react';

// components
import ClassList from './reschedule_preview_classList';
import LeaveClassesList from './reschedule_preview_LeaveClassesList';

class Preview extends Component {

    handleClick = () => {
        this.props.submit()
    }

    conditionalComponents = () => {
        if (this.props.classSelected) {
            return (
                <ClassList classes={this.props.classes} select={this.props.select} submit={this.props.submit} clearTimeTable={this.props.clearTimeTable}/>
            );
        } else {
            return <LeaveClassesList leaveRecord={this.props.leaveRecord} selectLeaveClass={this.props.selectLeaveClass}/>
        }
    };

    render() {
        return (
            <div>
                {this.conditionalComponents()}
            </div>
        )
    }
}

export default Preview;