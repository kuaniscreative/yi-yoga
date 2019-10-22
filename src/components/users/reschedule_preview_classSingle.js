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
        this.props.rescheduleApplication(classId, userId);
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
        userId: state.firebase.auth.uid
    };
};

const mapDispatchToProps = dispatch => {
    return {
        rescheduleApplication: (classId, userId) => {
            dispatch(rescheduleApplication(classId, userId))
        }
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: "classProfile" }])
)(ClassSingle);
