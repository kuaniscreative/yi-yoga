import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

// components
import ClassSingle from "./reschedule_preview_classSingle";
import NextStepButtonsArea from "../ui/nextStepButtonArea";

class ClassList extends Component {
    state = {
        viewingMonth: null,
        viewingDay: null
    };

    componentWillReceiveProps(nextProps) {
        const monthStart = nextProps.classes[0].classDate.toDate().getMonth();
        const dayStart = nextProps.courseOptions[0];
        this.setState({
            viewingMonth: monthStart,
            viewingDay: dayStart
        });
    }

    filteredClass = (classes, month, day) => {
        return classes.filter(classInfo => {
            const date = classInfo.classDate.toDate();
            const mm = date.getMonth();
            const classDay = date.getDay();
            return mm === month && day === classDay;
        });
    };

    filterSetter = e => {
        const key = e.target.name;
        const value = parseInt(e.target.dataset.setter, 10);
        this.setState({
            ...this.state,
            [key]: value
        })
    };

    handleClick = () => {
        this.props.submit();
    };

    render() {
        const courseOptions = this.props.courseOptions;
        const startMonth = this.props.classes[0].classDate.toDate().getMonth();
        const monthOptions = [startMonth, startMonth + 1];

        return (
            <div className="nextStepButtonsArea_parent">
                <div id="reschedule_preview_monthOptions">
                    {this.state.viewingMonth > -1 &&
                        monthOptions.map((monthNum, i) => {
                            return (
                                <button
                                    className="outlineButton"
                                    key={i}
                                    name="viewingMonth"
                                    data-setter={monthNum}
                                    onClick={this.filterSetter}
                                >{`${monthNum + 1}月`}</button>
                            );
                        })}
                </div>
                <div id="reschedule_preview_courseOptions">
                    {this.state.viewingDay > -1 &&
                        courseOptions &&
                        courseOptions.map((dayNum, i) => {
                            return (
                                <button
                                    className="outlineButton"
                                    key={i}
                                    name="viewingDay"
                                    data-setter={dayNum}
                                    onClick={this.filterSetter}
                                >{`週${dayNum.toLocaleString(
                                    "zh-u-nu-hanidec"
                                )}`}</button>
                            );
                        })}
                </div>
                {this.filteredClass(
                    this.props.classes,
                    this.state.viewingMonth,
                    this.state.viewingDay
                ).length
                    ? this.filteredClass(
                          this.props.classes,
                          this.state.viewingMonth,
                          this.state.viewingDay
                      ).map((classSingle, i) => {
                          return (
                              <ClassSingle
                                  classSingle={classSingle}
                                  key={i}
                                  select={this.props.select}
                              />
                          );
                      })
                    : "沒有課程"}
                <NextStepButtonsArea
                    action={this.handleClick}
                    cancel={this.props.clearTimeTable}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const regularCourse = state.firestore.ordered.regularCourse;
    const courseOptions =
        regularCourse &&
        regularCourse
            .map(courseInfo => {
                return courseInfo.dayNum;
            })
            .filter((num, i, self) => {
                return self.indexOf(num) === i;
            })
            .sort((a, b) => {
                return a - b;
            });
    return {
        courseOptions
    };
};

export default withRouter(
    compose(
        connect(mapStateToProps),
        firestoreConnect([{ collection: "regularCourse" }])
    )(ClassList)
);
