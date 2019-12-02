import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// components
import DateSingle from "./leaveApplication_classSingle";
import NextStepButtonsArea from "../ui/nextStepButtonArea";
import StepIndicator from "../stepIndicator";

// functions

class ClassList extends Component {
    state = {
        selected: {}
    };

    submit = () => {
        if (Object.keys(this.state.selected).length) {
            this.props.submit(this.state.selected);
        }
    };

    select = date => {
        this.setState({
            selected: date
        });
    };

    render() {
        return (
            <div className="layout_contentBlock nextStepButtonsArea_parent">
                <StepIndicator indicator="選擇請假日期" />
                <div id='leaveApplication_classList'>
                    {this.props.classes &&
                        this.props.classes.map((classInfo, i) => {
                            return (
                                <DateSingle
                                    classSingle={classInfo.date}
                                    key={i}
                                    select={this.select}
                                    canApply={classInfo.canApply}
                                    id={classInfo.id}
                                />
                            );
                        })}
                </div>

                <NextStepButtonsArea
                    action={this.submit}
                    cancel={() => {
                        this.props.history.push("/");
                    }}
                />
            </div>
        );
    }
}

export default withRouter(ClassList);
