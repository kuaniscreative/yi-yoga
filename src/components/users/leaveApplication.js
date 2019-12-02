import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

// components
import ClassList from "./leaveApplication_classList";
import StepIndicator from "../stepIndicator";
import LeaveApplicationSuccess from "./leaveApplication_success";

// actions
import { leaveApplication } from "../../actions/userActions";

class LeaveApplication extends Component {
    checkLeaveRecord = date => {
        const checker = `${date.getFullYear()}/${date.getMonth() + 1}`;
        if (
            this.props.leaveRecord &&
            this.props.leaveRecord.stamps.indexOf(checker) > -1
        ) {
            return false;
        }
        return true;
    };

    submit = info => {
        const date = info.date; // timestamp
        const id = info.id;
        const canApply = this.checkLeaveRecord(date.toDate());
        const classInfo = {
            id: id,
            date: date
        }

        if (canApply) {
            this.props.leaveApplication(this.props.userId, classInfo);
        } else {
            console.log("無法請假");
        }
    };

    conditionalComponents = () => {
        const success = this.props.leaveApplicationSuccess;
        const classifyClassesByLeaveRecord =
            this.props.userClasses &&
            this.props.userClasses
                .sort((a, b) => {
                    return a.date.seconds - b.date.seconds;
                })
                .map(info => {
                    const date = info.date.toDate();
                    const mm = date.getMonth();
                    const yyyy = date.getFullYear();
                    const leaveRecord = this.props.leaveRecord
                        ? this.props.leaveRecord.stamps
                        : null;
                    let canApply = true;
                    leaveRecord &&
                        leaveRecord.forEach(record => {
                            const recordMonth =
                                parseInt(record.split("/")[1], 10) - 1;
                            const recordYear = parseInt(
                                record.split("/")[0],
                                10
                            );
                            if (recordMonth === mm && recordYear === yyyy) {
                                canApply = false;
                            }
                        });

                    return {
                        date: info.date,
                        id: info.id,
                        canApply
                    };
                });

        if (success) {
            return <LeaveApplicationSuccess />;
        } else if (this.props.userClasses) {
            return (
                <ClassList
                    submit={this.submit}
                    classes={classifyClassesByLeaveRecord}
                />
            );
        } else {
            return (
                <div className="innerContent nextStepButtonsArea_parent">
                    還沒有報名任何課程
                    <div className="nextStepButtonsArea">
                        <Link to="/" className="cancelGray">
                            回首頁
                        </Link>
                    </div>
                </div>
            );
        }
    };

    indicatorOutput = () => {
        const success = this.props.leaveApplicationSuccess;
        if (success) {
            return "請假結果";
        } else {
            return "選擇請假日期";
        }
    };

    render() {
        return (
            <div id="leaveApplication">
                <div className='layout_pageTitle'>
                    <div className="wrapper">
                        <h1>請假</h1>
                    </div>
                </div>
                {this.conditionalComponents()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const leaveRecord = state.firestore.ordered.leaveRecord;
    const userId = state.firebase.auth.uid;
    const userData = state.firestore.ordered.user
        ? state.firestore.ordered.user.find(user => {
              return user.id === state.firebase.auth.uid;
          })
        : null;
    const userRecord =
        leaveRecord && userId
            ? leaveRecord.find(record => {
                  return record.id === userId;
              })
            : null;

    return {
        userId: state.firebase.auth.uid,
        leaveRecord: userRecord,
        leaveApplicationSuccess: state.user.leaveApplicationSuccess,
        userClasses: userData ? userData.allClasses : null,
        classProfile: state.firestore.ordered.classProfile
    };
};

const mapDispatchToProps = dispatch => {
    return {
        leaveApplication: (userId, classInfo) => {
            dispatch(leaveApplication(userId, classInfo));
        },
        clearSuccessMessage: () => {
            dispatch({ type: "CLEAR_SUCCESS_MESSAGE_LEAVE" });
        }
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: "classProfile" },
        { collection: "user" },
        { collection: "leaveRecord" }
    ])
)(LeaveApplication);
