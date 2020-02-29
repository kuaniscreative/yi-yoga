import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

// components
import StepIndicator from '../stepIndicator';
import LeaveSingle from './userStatus_leaveSingle';
import RescheduleSingle from './userStatus_rescheduleSingle';
import PaymentSingle from './userStatus_paymentSingle';
import ClassSingle from './userStatus_classSingle';
import TitleBlock from '../ui/titleBlock';
import Block from '../ui/block';
import ButtonGroup from '../ui/buttonGroup';
import ClassList from './userStatus_classList';
import Payments from './userStatus_payments';
import Arrangements from './userStatus_arrangements';

const NavButton = styled.button`
  font-weight: 500;
  font-size: 0.9rem;
  @media (mex-width: 576px) {
    font-size: 0.75rem;
  }
`;

const UserStatus = () => {
  const [view, setView] = useState('classList');
  const changeView = (e) => {
    const view = e.target.getAttribute('name');
    setView(view);
  };
  const views = {
    classList: <ClassList />,
    payments: <Payments />,
    arrangements: <Arrangements />
  };

  return (
    <div>
      <TitleBlock title="課程狀態" />
      <Block>
        <ButtonGroup>
          <NavButton name="classList" onClick={changeView}>
            所有課程
          </NavButton>
          <NavButton name="payments" onClick={changeView}>
            繳費狀態
          </NavButton>
          <NavButton name="arrangements" onClick={changeView}>
            請假 & 補課
          </NavButton>
        </ButtonGroup>
      </Block>
      <Block>{views[view]}</Block>
    </div>
  );
};

export default UserStatus;
// class UserStatus extends Component {
//   state = {
//     inView: 1
//   };

//   changeView = (e, num) => {
//     e.target.classList.add('inView');
//     this.setState({
//       ...this.state,
//       inView: num
//     });
//   };

//   render() {
//     const uid = this.props.uid;
//     const leaveRecord = this.props.leaveRecord;
//     const classProfile = this.props.classProfile;
//     const payments = this.props.payments;
//     const userClasses = this.props.userClasses;

//     return (
//       <div id="userStatus" className="innerContent">
//         <div className="layout_pageTitle">
//           <div className="wrapper">
//             <h1>課程狀態</h1>
//           </div>
//         </div>
//         <div className="layout_contentBlock">
//           <div id="userStatus_menu">
//             <div>
//               <button
//                 onClick={(e) => {
//                   this.changeView(e, 1);
//                 }}
//                 className={this.state.inView === 1 ? 'inView' : null}
//               >
//                 所有課程
//               </button>
//             </div>
//             <div>
//               <button
//                 onClick={(e) => {
//                   this.changeView(e, 2);
//                 }}
//                 className={this.state.inView === 2 ? 'inView' : null}
//               >
//                 繳費狀態
//               </button>
//             </div>
//             <div>
//               <button
//                 onClick={(e) => {
//                   this.changeView(e, 3);
//                 }}
//                 className={this.state.inView === 3 ? 'inView' : null}
//               >
//                 請假 & 補課
//               </button>
//             </div>
//           </div>
//         </div>
//         {/**
//          *
//          *   報名
//          *
//          */}
//         {this.state.inView === 2 ? (
//           <div className="layout_contentBlock">
//             {payments &&
//               payments.map((payment, i) => {
//                 return <PaymentSingle infos={payment} key={i} />;
//               })}
//             {/** default*/
//             payments && !payments.length ? (
//               <p name="default">沒有任何報名資訊</p>
//             ) : null}
//           </div>
//         ) : null}

//         {/**
//          *
//          *   請假 & 補課
//          *
//          */}
//         {this.state.inView === 3 ? (
//           <div className="layout_contentBlock">
//             {/**
//              *      請假
//              */}
//             <div>
//               <StepIndicator indicator="請假狀態" />
//               {leaveRecord &&
//                 leaveRecord.reschedulable.map((date, i) => {
//                   return (
//                     <LeaveSingle status="reschedulable" date={date} key={i} />
//                   );
//                 })}
//               {leaveRecord &&
//                 leaveRecord.reschedulePending.map((date, i) => {
//                   const pendingClassInfo =
//                     classProfile &&
//                     classProfile.find((profile) => {
//                       return profile.id === date.pendingClassId;
//                     });
//                   return (
//                     <LeaveSingle
//                       status="reschedulePending"
//                       date={date.leaveDate}
//                       pendingClassInfo={pendingClassInfo}
//                       uid={uid}
//                       key={i}
//                     />
//                   );
//                 })}
//               {leaveRecord &&
//                 leaveRecord.rescheduled.map((date, i) => {
//                   const rescheduleClassInfo =
//                     classProfile &&
//                     classProfile.find((profile) => {
//                       return profile.id === date.rescheduleClassId;
//                     });
//                   return (
//                     <LeaveSingle
//                       status="rescheduled"
//                       date={date.leaveDate}
//                       rescheduleClassInfo={rescheduleClassInfo}
//                       key={i}
//                     />
//                   );
//                 })}
//               {/** default*/
//               leaveRecord &&
//               !leaveRecord.rescheduled.length &&
//               !leaveRecord.reschedulePending.length &&
//               !leaveRecord.reschedulable.length ? (
//                 <p name="default">沒有任何請假資訊</p>
//               ) : null}
//             </div>

//             {/**
//              *      補課
//              */}
//             <div>
//               <StepIndicator indicator="補課狀態" />
//               {leaveRecord &&
//                 leaveRecord.reschedulePending.map((date, i) => {
//                   const pendingClassInfo =
//                     classProfile &&
//                     classProfile.find((profile) => {
//                       return profile.id === date.pendingClassId;
//                     });
//                   return (
//                     <RescheduleSingle
//                       pendingClassInfo={pendingClassInfo}
//                       uid={uid}
//                       key={i}
//                     />
//                   );
//                 })}
//               {leaveRecord &&
//                 leaveRecord.rescheduled.map((date, i) => {
//                   const rescheduleClassInfo =
//                     classProfile &&
//                     classProfile.find((profile) => {
//                       return profile.id === date.rescheduleClassId;
//                     });
//                   return (
//                     <RescheduleSingle
//                       rescheduleClassInfo={rescheduleClassInfo}
//                       key={i}
//                     />
//                   );
//                 })}
//               {/** default*/
//               leaveRecord &&
//               !leaveRecord.rescheduled.length &&
//               !leaveRecord.reschedulePending.length ? (
//                 <p name="default">沒有任何補課資訊</p>
//               ) : null}
//             </div>
//           </div>
//         ) : null}

//         {/**
//          *
//          *   所有課程
//          *
//          */}
//         {this.state.inView === 1 ? (
//           <div className="layout_contentBlock">
//             <ul className="borderBottomList">
//               {userClasses.map((classInfo) => {
//                 return (
//                   <li>
//                     <ClassSingle classInfo={classInfo} />
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         ) : null}
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   const uid = state.firebase.auth.uid;
//   const users = state.firestore.ordered.user;
//   const classProfile = state.firestore.ordered.classProfile;
//   const leaveRecord = state.firestore.ordered.leaveRecord
//     ? state.firestore.ordered.leaveRecord.find((record) => {
//         return record.id === uid;
//       })
//     : null;
//   const payments =
//     state.firestore.ordered.paymentStatus &&
//     state.firestore.ordered.paymentStatus.filter((status) => {
//       return status.owner === uid;
//     });

//   const userData =
//     users && uid
//       ? users.find((user) => {
//           return user.id === uid;
//         })
//       : null;

//   const processedData = () => {
//     const allClasses = userData ? userData.allClasses : null;
//     const reschedulable = leaveRecord ? leaveRecord.reschedulable : null;
//     const rescheduled = leaveRecord ? leaveRecord.rescheduled : null;
//     const reschedulePending = leaveRecord
//       ? leaveRecord.reschedulePending
//       : null;

//     const classes = [];
//     allClasses &&
//       allClasses.forEach((classInfo) => {
//         classes.push({
//           date: classInfo.date.toDate()
//         });
//       });
//     reschedulable &&
//       reschedulable.forEach((date) => {
//         const newInfo = {
//           date: date.toDate(),
//           label: 'reschedulable'
//         };

//         classes.push(newInfo);
//       });
//     rescheduled &&
//       rescheduled.forEach((info) => {
//         const reshceduleClassInfo =
//           classProfile &&
//           classProfile.find((profile) => {
//             return profile.id === info.rescheduleClassId;
//           });
//         reshceduleClassInfo &&
//           classes.push({
//             date: reshceduleClassInfo.date.toDate(),
//             label: 'rescheduled'
//           });

//         const existed = classes.find((classInfo) => {
//           return classInfo.date.seconds === info.leaveDate.seconds;
//         });
//         if (!existed) {
//           classes.push({
//             date: info.leaveDate.toDate(),
//             label: 'leave'
//           });
//         }
//       });
//     reschedulePending &&
//       reschedulePending.forEach((info) => {
//         const pendingClassInfo =
//           classProfile &&
//           classProfile.find((profile) => {
//             return profile.id === info.pendingClassId;
//           });
//         pendingClassInfo &&
//           classes.push({
//             date: pendingClassInfo.date,
//             label: 'reschedulePending'
//           });

//         const existed = classes.find((classInfo) => {
//           return classInfo.date.seconds === info.leaveDate.seconds;
//         });
//         if (!existed) {
//           classes.push({
//             date: info.leaveDate,
//             label: 'leave'
//           });
//         }
//       });

//     return classes.sort((a, b) => {
//       return a.date.valueOf() - b.date.valueOf();
//     });
//   };

//   return {
//     uid: uid,
//     leaveRecord: leaveRecord,
//     classProfile: state.firestore.ordered.classProfile,
//     payments: payments,
//     userClasses: processedData()
//   };
// };

// export default compose(
//   connect(mapStateToProps),
//   firestoreConnect([
//     { collection: 'user' },
//     { collection: 'leaveRecord' },
//     { collection: 'classProfile' },
//     { collection: 'paymentStatus' }
//   ])
// )(UserStatus);
