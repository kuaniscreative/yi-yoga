import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

// functions
import { dateOutput } from "../../functions/dateFunctions";

// actions
import { rescheduleApplication } from "../../actions/userActions";

class ClassSingle extends Component {
    handleChange = e => {
        this.props.select(e.target.value);
    };

    render() {
        const classId = this.props.classSingle.id;
        const date = this.props.classSingle.classDate.toDate();
        const dd = date.getDate();
        const mm = date.getMonth();
        const yyyy = date.getFullYear();
        const hr = date.getHours();
        const min = date.getMinutes();
        const startAt = `${hr}:${min}`;
        const day = date.getDay();
        const dayOutput = `週${day.toLocaleString("zh-u-nu-hanidec")}`;

        return (
            <label>
                <div className="dateHero checkboxContainer_message">
                    <span name="date">{`${dd}`}</span>
                    <span name="monthYear">{`${mm + 1}月 ${yyyy}`}</span>
                    <span name="seperator"> | </span>
                    <span name="dayTime">{`${dayOutput} ${startAt}`}</span>
                </div>
                <div className="checkboxContainer_checkbox">
                    <input
                        type="radio"
                        name="rescheduleDate"
                        value={classId}
                        onChange={this.handleChange}
                    />
                    <span className="checkmark"></span>
                </div>
            </label>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.firebase.auth.uid,
        stamp: state.user.selectedRecheduleStamp
    };
};

const mapDispatchToProps = dispatch => {
    return {
        rescheduleApplication: (classId, userId, stamp) => {
            dispatch(rescheduleApplication(classId, userId, stamp));
        }
    };
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect([{ collection: "classProfile" }])
)(ClassSingle);
