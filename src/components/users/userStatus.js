import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

// components
import StepIndicator from "../stepIndicator";
import LeaveSingle from "./userStatus_leaveSingle";
import RescheduleSingle from './userStatus_rescheduleSingle';

const UserStatus = ({ uid, leaveRecord, classProfile }) => {
    return (
        <div id="userStatus" className="innerContent">
            {
            /**
            *
            *   請假
            *
            */
             }
            <div className='contentBlock'>
                <StepIndicator indicator="請假狀態" />
                { leaveRecord && leaveRecord.reschedulable.map((date, i) => {
                    return <LeaveSingle status="reschedulable" date={date} key={i}/>
                })}
                { leaveRecord && leaveRecord.reschedulePending.map((date, i) => {
                    const pendingClassInfo = classProfile && classProfile.find((profile) => {
                        return profile.id === date.pendingClassId
                    })
                    return <LeaveSingle status="reschedulePending" date={date.leaveDate} pendingClassInfo={pendingClassInfo} uid={uid} key={i}/>
                })}
                { leaveRecord && leaveRecord.rescheduled.map((date, i) => {
                    const rescheduleClassInfo = classProfile && classProfile.find((profile) => {
                        return profile.id === date.rescheduleClassId
                    })
                    return <LeaveSingle status="rescheduled" date={date.leaveDate} rescheduleClassInfo={rescheduleClassInfo} key={i}/>
                })}
            </div>
            {
            /**
            *
            *   補課
            *
            */
             }
            <div className='contentBlock'>
                <StepIndicator indicator="補課狀態" />
                { leaveRecord && leaveRecord.reschedulePending.map((date, i) => {
                    const pendingClassInfo = classProfile && classProfile.find((profile) => {
                        return profile.id === date.pendingClassId
                    })
                    return <RescheduleSingle pendingClassInfo={pendingClassInfo} uid={uid} key={i}/>
                })}
                { leaveRecord && leaveRecord.rescheduled.map((date, i) => {
                    const rescheduleClassInfo = classProfile && classProfile.find((profile) => {
                        return profile.id === date.rescheduleClassId
                    })
                    return <RescheduleSingle rescheduleClassInfo={rescheduleClassInfo} key={i}/>
                })}
            </div>
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
