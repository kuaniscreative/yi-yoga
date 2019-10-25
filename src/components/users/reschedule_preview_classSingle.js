import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

// functions
import { dateOutput } from "../../functions/dateFunctions";

// actions
import { rescheduleApplication } from "../../actions/userActions";

class ClassSingle extends Component {
    handleClick = () => {
        const classId = this.props.classInfo.id;
        const userId = this.props.userId;
        const stamp = this.props.stamp;
        this.props.rescheduleApplication(classId, userId, stamp);
    };

    render() {
        const output = dateOutput(this.props.classInfo.classDate);

        return (
            <div>
                {`${output.yyyy}.${output.mm}.${output.dd} ${output.startAtHour}:${output.startAtMin}`}
                <button onClick={this.handleClick}>確認</button>
            </div>
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
            dispatch(rescheduleApplication(classId, userId, stamp))
        }
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: "classProfile" }])
)(ClassSingle);