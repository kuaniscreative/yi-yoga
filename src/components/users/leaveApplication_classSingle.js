import React, { Component } from "react";

// components
import ItemBarWithAction from "../ui/itemBarWithAction";
import DateSingle_UI from '../ui/dateSingle';

class DateSingle extends Component {
    state = {
        selected: false
    };

    handleSelect = () => {
        if (this.props.canApply) {
            this.props.select({
                date: this.props.classSingle,
                id: this.props.id
            });
        }
    };

    conditionalCheckmark = () => {
        return this.props.canApply ? (
            <div className="checkboxContainer_checkbox">
                <input
                    type="radio"
                    name="leaveDate"
                    onChange={this.handleSelect}
                />
                <span className="checkmark"></span>
            </div>
        ) : (
            <div className="checkboxContainer_checkbox">不可請假</div>
        );
    };

    render() {
        const date = this.props.classSingle.toDate();
        const disableSelect = this.props.canApply ? "" : "disableSelect";

        return (
            <label
                className={`checkboxContainer ${disableSelect}`}
                onClick={this.handleClick}
            >
                <ItemBarWithAction
                    message={
                        <DateSingle_UI date={date} />
                    }
                    action={this.conditionalCheckmark()}
                />
            </label>
        );
    }
}

export default DateSingle;
