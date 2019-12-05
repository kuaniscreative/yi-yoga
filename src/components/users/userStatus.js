import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

// components
import StepIndicator from "../stepIndicator";
import LeaveSingle from "./userStatus_leaveSingle";
import RescheduleSingle from "./userStatus_rescheduleSingle";
import PaymentSingle from "./userStatus_paymentSingle";
import ItemBarWithAction from "../ui/itemBarWithAction";
import ClassSingle from './userStatus_classSingle';

const UserStatus = ({
    uid,
    leaveRecord,
    classProfile,
    payments,
    userClasses
}) => {
    return (
        <div id="userStatus" className="innerContent">
            <div className="layout_pageTitle">
                <div className="wrapper">
                    <h1>課程狀態</h1>
                </div>
            </div>
            {/**
             *
             *   報名
             *
             */}
            <div className="layout_contentBlock">
                <StepIndicator indicator="報名狀態" />
                {payments &&
                    payments.map((payment, i) => {
                        return <PaymentSingle infos={payment} key={i} />;
                    })}
                {/** default*/
                payments && !payments.length ? (
                    <p name="default">沒有任何報名資訊</p>
                ) : null}
            </div>

            {/**
             *
             *   請假
             *
             */}
            <div className="layout_contentBlock">
                <StepIndicator indicator="請假狀態" />
                {leaveRecord &&
                    leaveRecord.reschedulable.map((date, i) => {
                        return (
                            <LeaveSingle
                                status="reschedulable"
                                date={date}
                                key={i}
                            />
                        );
                    })}
                {leaveRecord &&
                    leaveRecord.reschedulePending.map((date, i) => {
                        const pendingClassInfo =
                            classProfile &&
                            classProfile.find(profile => {
                                return profile.id === date.pendingClassId;
                            });
                        return (
                            <LeaveSingle
                                status="reschedulePending"
                                date={date.leaveDate}
                                pendingClassInfo={pendingClassInfo}
                                uid={uid}
                                key={i}
                            />
                        );
                    })}
                {leaveRecord &&
                    leaveRecord.rescheduled.map((date, i) => {
                        const rescheduleClassInfo =
                            classProfile &&
                            classProfile.find(profile => {
                                return profile.id === date.rescheduleClassId;
                            });
                        return (
                            <LeaveSingle
                                status="rescheduled"
                                date={date.leaveDate}
                                rescheduleClassInfo={rescheduleClassInfo}
                                key={i}
                            />
                        );
                    })}
                {/** default*/
                leaveRecord &&
                !leaveRecord.rescheduled.length &&
                !leaveRecord.reschedulePending.length &&
                !leaveRecord.reschedulable.length ? (
                    <p name="default">沒有任何請假資訊</p>
                ) : null}
            </div>

            {/**
             *
             *   補課
             *
             */}
            <div className="layout_contentBlock">
                <StepIndicator indicator="補課狀態" />
                {leaveRecord &&
                    leaveRecord.reschedulePending.map((date, i) => {
                        const pendingClassInfo =
                            classProfile &&
                            classProfile.find(profile => {
                                return profile.id === date.pendingClassId;
                            });
                        return (
                            <RescheduleSingle
                                pendingClassInfo={pendingClassInfo}
                                uid={uid}
                                key={i}
                            />
                        );
                    })}
                {leaveRecord &&
                    leaveRecord.rescheduled.map((date, i) => {
                        const rescheduleClassInfo =
                            classProfile &&
                            classProfile.find(profile => {
                                return profile.id === date.rescheduleClassId;
                            });
                        return (
                            <RescheduleSingle
                                rescheduleClassInfo={rescheduleClassInfo}
                                key={i}
                            />
                        );
                    })}
                {/** default*/
                leaveRecord &&
                !leaveRecord.rescheduled.length &&
                !leaveRecord.reschedulePending.length ? (
                    <p name="default">沒有任何補課資訊</p>
                ) : null}

                {/**
                 *
                 *   所有課程
                 *
                 */}
            </div>
            <div className="layout_contentBlock">
                <StepIndicator indicator="所有課程" />
                <ul className="borderBottomList">
                    {userClasses.map(classInfo => {
                        
                        return (
                            <li>
                                <ClassSingle classInfo={classInfo}/>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    const uid = state.firebase.auth.uid;
    const users = state.firestore.ordered.user;
    const classProfile = state.firestore.ordered.classProfile;
    const leaveRecord = state.firestore.ordered.leaveRecord
        ? state.firestore.ordered.leaveRecord.find(record => {
              return record.id === uid;
          })
        : null;
    const payments =
        state.firestore.ordered.paymentStatus &&
        state.firestore.ordered.paymentStatus.filter(status => {
            return status.owner === uid;
        });

    const userData =
        users && uid
            ? users.find(user => {
                  return user.id === uid;
              })
            : null;

    const processedData = () => {
        const allClasses = userData ? userData.allClasses : null;
        const leaveClasses = userData ? userData.leave : null;
        const reschedulable = leaveRecord ? leaveRecord.reschedulable : null;
        const rescheduled = leaveRecord ? leaveRecord.rescheduled : null;
        const reschedulePending = leaveRecord
            ? leaveRecord.reschedulePending
            : null;

        const classes = [];
        allClasses &&
            allClasses.forEach(classInfo => {
                classes.push({
                    date: classInfo.date.toDate()
                });
            });
        reschedulable &&
            reschedulable.forEach(date => {
                const newInfo = {
                    date: date.toDate(),
                    label: "reschedulable"
                };

                classes.push(newInfo);
            });
        rescheduled &&
            rescheduled.forEach(info => {
                const reshceduleClassInfo =
                    classProfile &&
                    classProfile.find(profile => {
                        return profile.id === info.rescheduleClassId;
                    });
                reshceduleClassInfo &&
                    classes.push({
                        date: reshceduleClassInfo.classDate.toDate(),
                        label: "rescheduled"
                    });

                const existed = classes.find(classInfo => {
                    return classInfo.date.seconds === info.leaveDate.seconds;
                });
                if (!existed) {
                    classes.push({
                        date: info.leaveDate.toDate(),
                        label: "leave"
                    });
                }
            });
        reschedulePending &&
            reschedulePending.forEach(info => {
                const pendingClassInfo =
                    classProfile &&
                    classProfile.find(profile => {
                        return profile.id === info.pendingClassId;
                    });
                pendingClassInfo &&
                    classes.push({
                        date: pendingClassInfo.classDate,
                        label: "reschedulePending"
                    });

                const existed = classes.find(classInfo => {
                    return classInfo.date.seconds === info.leaveDate.seconds;
                });
                if (!existed) {
                    classes.push({
                        date: info.leaveDate,
                        label: "leave"
                    });
                }
            });

        return classes;
    };

    return {
        uid: uid,
        leaveRecord: leaveRecord,
        classProfile: state.firestore.ordered.classProfile,
        payments: payments,
        userClasses: processedData()
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: "user" },
        { collection: "leaveRecord" },
        { collection: "classProfile" },
        { collection: "paymentStatus" }
    ])
)(UserStatus);
