import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

// components
import StepIndicator from "../stepIndicator";
import LeaveSingle from "./userStatus_leaveSingle";

const UserStatus = ({ uid, leaveRecord, classProfile }) => {
    return (
        <div id="userStatus" className="innerContent">
            <div className='contentBlock'>
                <StepIndicator indicator="請假狀態" />
                { leaveRecord && leaveRecord.reschedulable.map((date) => {
                    return <LeaveSingle status="reschedulable" date={date}/>
                })}
                { leaveRecord && leaveRecord.reschedulePending.map((date) => {
                    const pendingClassInfo = classProfile && classProfile.find((profile) => {
                        return profile.id === date.pendingClassId
                    })
                    return <LeaveSingle status="reschedulePending" date={date.leaveDate} pendingClassInfo={pendingClassInfo} uid={uid}/>
                })}
                { leaveRecord && leaveRecord.rescheduled.map((date) => {
                    const rescheduleClassInfo = classProfile && classProfile.find((profile) => {
                        return profile.id === date.rescheduleClassId
                    })
                    return <LeaveSingle status="rescheduled" date={date.leaveDate} rescheduleClassInfo={rescheduleClassInfo}/>
                })}
            </div>
            <StepIndicator indicator="補課狀態" />
            <p>2019年11月2日請假，已安排補課</p>
            <p>2019年12月5日請假，補課候補中</p>
        </div>
    );
};

const mapStateToProps = state => {
    const uid = state.firebase.auth.uid;
    const leaveRecord = state.firestore.ordered.leaveRecord
        ? state.firestore.ordered.leaveRecord.find(record => {
              return record.id === uid;
          })
        : null;
    return {
        uid: uid,
        leaveRecord: leaveRecord,
        classProfile: state.firestore.ordered.classProfile
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: "user" }, { collection: "leaveRecord" }, {collection: 'classProfile'}])
)(UserStatus);
