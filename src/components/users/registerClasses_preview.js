import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

// components
import StepIndicator from "../stepIndicator";
import NextStepButtonsArea from "../ui/nextStepButtonArea";
import DateSingle from "../ui/dateSingle";
import ItemBarWithAction from "../ui/itemBarWithAction";

class Preview extends Component {
    // optionsList = (courses = []) => {
    //     return (
    //         courses.length &&
    //         courses.map((course, i) => {
    //             const day = course.name.split(" ", 1)[0];
    //             const time = course.name.replace(`${day} `, "");
    //             return (
    //                 <div key={i} className="checkboxContainer noReverse">
    //                     <div className="dayHero checkboxContainer_message">
    //                         <span className="dayHero_day">{day}</span>
    //                         <span className="dayHero_time">{time}</span>
    //                         <div className="dayHero_message">
    //                             {`${course.classes.length}堂課，金額${course.classes.length *
    //                                 250}元`}
    //                         </div>
    //                     </div>

    //                     <div className="checkboxContainer_checkbox">
    //                         <button
    //                             className="cancelRed"
    //                             onClick={() => {
    //                                 this.props.deselect(course);
    //                             }}
    //                         >
    //                             取消
    //                         </button>
    //                     </div>
    //                 </div>
    //             );
    //         })
    //     );
    // };

    returnPrice = (num) => {
        if (num >= 8) {
            return num * 250
        } else if (num >= 4) {
            return num * 300
        } else {
            return num * 350
        }
    }

    render() {
        const num = this.props.selection.length;
        const cost = this.returnPrice(num);

        return (
            <div className="preview nextStepButtonsArea_parent">
                <StepIndicator indicator="step2. 確認表單" />
                <p>{`選取了${num}課，共${cost}元`}</p>
                {this.props.selection.map((info, i) => {
                    return (
                        <ItemBarWithAction
                            message={<DateSingle date={info.date} />}
                            action={
                                <button
                                    className="cancelRed"
                                    onClick={() => {
                                        this.props.removeClass(info)
                                    }}
                                >
                                    取消
                                </button>
                            }
                            key={i}
                        />
                    );
                })}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeClass: (info) => {
            dispatch({type:'REMOVE_CLASS_WHEN_REGISTER_CLASS', info})
        }
    }
}

export default connect(null, mapDispatchToProps)(Preview);
