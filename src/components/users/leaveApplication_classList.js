import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// components
import DateSingle from "./leaveApplication_classSingle";
import NextStepButtonsArea from "../ui/nextStepButtonArea";

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
        console.log(date);
        this.setState({
            selected: date
        });
    };

    render() {
        return (
            <div className="centerList nextStepButtonsArea_parent">
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
