import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

// components
import StepIndicator from "../stepIndicator";
import Calendar from "./registerClasses_calendar";
import SelectTimeModal from "./registerClasses_selectTimeModal";
import NextStepButtonsArea from '../ui/nextStepButtonArea';

class SelectClassPanel extends Component {

    state = {
        inView: 0 // the viewing calendar
    }

    setViewingCalendar = (index) => {
        this.setState({
            ...this.state,
            inView: index
        })
    }

    finishSelecting = () => {
        if (this.props.selection.length) {
            this.props.setParentState();
        } else {
            alert('未選取任何課堂')
        }
        
    }

    render() {
        const span = this.props.session.span;
        return (
            <div id="selectClassPanel">
                <StepIndicator
                    indicator="step.1 選取課堂"
                    className="actionCard_content"
                />
                {/**
                 *
                 *       月份按鈕
                 *
                 */}
                <div id="selectClass_monthSelectors">
                    {span.map((stamp, i) => {
                        const month = stamp.split("/")[0];
                        const output = `${month}月`;
                        const className = this.state.inView === i ? 'outlineButton inView' : 'outlineButton';
                        return (
                            <button className={className} key={i} onClick={() => {this.setViewingCalendar(i)}}>
                                {output}
                            </button>
                        );
                    })}
                </div>

                {/**
                 *
                 *       日曆
                 *
                 */}
                <div id="selectClass_calendars" className='actionCard_content'>
                    {
                        span.map((stamp, i) => {
                            const dateInfo = stamp.split('/');
                            const month = dateInfo[0];
                            const year = dateInfo[1];
                            const date = new Date(year, month - 1);
                            const key = date.toLocaleString("default", { month: "short" });
                            const calendarInfo = this.props.calendarInfos ? this.props.calendarInfos[key] : null;
                            const className = this.state.inView === i ? 'inView' : '';
                            return  <Calendar calendarInfo={calendarInfo} month={month} year={year} key={i} className={className} monthKey={key}/>
                        })
                    }
                </div>

                {/**
                 *
                 *       日期確認彈窗
                 *
                 */}
                <SelectTimeModal />

                {/**
                 *
                 *       按鈕
                 *
                 */}
                 <NextStepButtonsArea action={this.finishSelecting} cancel={() => {this.props.history.push('/')}}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        calendarInfos: state.registerClass.calendarInfos,
        selection: state.registerClass.selection
    };
};


export default withRouter(connect(mapStateToProps)(SelectClassPanel));
