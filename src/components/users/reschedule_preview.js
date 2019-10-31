import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                <ClassList classes={this.props.classes} select={this.props.select} submit={this.props.submit}/>
            );
        } else {
            return <LeaveClassesList leaveRecord={this.props.leaveRecord} selectLeaveClass={this.props.selectLeaveClass}/>
        }
    };

    render() {
        console.log(this.props.classSelected)
        return (
            <div>
                {this.conditionalComponents()}
            </div>
        )
    }
}

export default Preview;