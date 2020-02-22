import React, { Component, useContext, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

// components
import ItemBarWithAction from '../ui/itemBarWithAction';
import TitleBlock from '../ui/titleBlock';
import Block from '../ui/block';
import SessionItem from './paymentStatus_sessionItem';
import Modal from './paymentStatus_modal';

// contexts
import { allPaymentContext } from '../contexts/allPaymentContext';
import { sessionContext } from '../contexts/sessionContext';

// functions
import { combinePaymentsWithSession } from '../../functions/paymentStatusHelpers';
import keyGen from '../../functions/keyGen';

const PaymentStatus = () => {
  const { sessions } = useContext(sessionContext);
  const { payments } = useContext(allPaymentContext);
  const sessionData = combinePaymentsWithSession(payments, sessions);

  const [modalData, setModalData] = useState(null);
  const [modlaIsActive, setModalIsActive] = useState(false);

  return (
    <div>
      <TitleBlock title="付款狀況" />
      <Block>
        {sessionData.map((sessionInfo) => {
          return (
            <SessionItem
              name={sessionInfo.name}
              payments={sessionInfo.payments}
              setModalData={setModalData}
              setModalIsActive={setModalIsActive}
              key={keyGen()}
            />
          );
        })}
      </Block>
      <Modal
        modalData={modalData}
        setModalData={setModalData}
        isActive={modlaIsActive}
        setModalIsActive={setModalIsActive}
      />
    </div>
  );
};

export default PaymentStatus;

// class PaymentStatus extends Component {
//   state = {
//     modalData: null
//   };

//   handleClick = (key, name, payments) => {
//     this.setModaldata(key, name, payments, this.openModal);
//   };

//   openModal = () => {
//     const modal = document.getElementById('paymentModalWrapper');
//     modal.classList.add('active');
//   };

//   setModaldata = (key, name, payments, callback) => {
//     this.setState(
//       {
//         ...this.state,
//         modalData: {
//           key: key,
//           name: name,
//           payments: payments
//         }
//       },
//       callback
//     );
//   };

//   closeModal = (e) => {
//     const modal = document.getElementById('paymentModalWrapper');
//     if (
//       e.target.id === 'paymentModalWrapper' ||
//       e.target.id === 'paymentModal_closeBtn'
//     ) {
//       modal.classList.remove('active');
//     }
//   };

//   paymentConfirmed = () => {
//     alert('預計在按下按鈕後更改繳費狀況。學生的面板會顯示老師已經確認收款');
//   };

//   render() {
//     const data = this.props.data;
//     return (
//       <div id="adminPaymentStatus">
//         <TitleBlock title="付款狀況" />
//         <Block></Block>
//         <div id="adminPaymentStatus_session" className="layout_contentBlock">
//           {data
//             ? data.map((sessionInfo, i) => {
//                 return (
//                   <div key={i}>
//                     <p>{sessionInfo.name}</p>
//                     <button
//                       onClick={() => {
//                         this.handleClick(
//                           '未付款',
//                           sessionInfo.name,
//                           sessionInfo.unpaid
//                         );
//                       }}
//                     >
//                       未付款：
//                       <span>{sessionInfo.unpaid.length}</span>
//                     </button>
//                     <button
//                       onClick={() => {
//                         this.handleClick(
//                           '待確認',
//                           sessionInfo.name,
//                           sessionInfo.uncheck
//                         );
//                       }}
//                     >
//                       待確認：
//                       <span>{sessionInfo.uncheck.length}</span>
//                     </button>
//                     <button
//                       onClick={() => {
//                         this.handleClick(
//                           '已完成',
//                           sessionInfo.name,
//                           sessionInfo.finished
//                         );
//                       }}
//                     >
//                       已完成：
//                       <span>{sessionInfo.finished.length}</span>
//                     </button>
//                   </div>
//                 );
//               })
//             : null}
//         </div>

//         {/**
//          *       燈箱
//          */}
//         <div id="paymentModalWrapper" onClick={this.closeModal}>
//           {this.state.modalData ? (
//             <div id="paymentModal">
//               <div className="borderBottomList_title">
//                 <h1>{this.state.modalData.key}</h1>
//                 <p>{this.state.modalData.name}</p>
//               </div>
//               <ul className="borderBottomList">
//                 {this.state.modalData.payments.map((payment, i) => {
//                   const key = this.state.modalData.key;
//                   return key === '未付款' ? (
//                     <li key={i}>
//                       <div className="paymentModal_owner">
//                         <span name="nickName">{payment.owner.nickName}</span>
//                         <span name="name">{payment.owner.name}</span>
//                       </div>
//                       <div className="paymentModal_infos">
//                         <span name="amount">金額：{payment.amount}</span>
//                       </div>
//                     </li>
//                   ) : key === '待確認' ? (
//                     <li key={i}>
//                       <ItemBarWithAction
//                         message={
//                           <div>
//                             <div className="paymentModal_owner">
//                               <span name="nickName">
//                                 {payment.owner.nickName}
//                               </span>
//                               <span name="name">{payment.owner.name}</span>
//                             </div>
//                             <div className="paymentModal_infos">
//                               <span name="amount">
//                                 金額：
//                                 {payment.amount}
//                               </span>
//                               <span name="seperator">｜</span>
//                               <span name="method">
//                                 {payment.method === 'transaction'
//                                   ? `於${payment.date}匯款，帳號末四碼：${payment.account}`
//                                   : `於${payment.date}當面繳交學費`}
//                               </span>
//                             </div>
//                           </div>
//                         }
//                         action={
//                           <button
//                             className="outlineButton"
//                             onClick={this.paymentConfirmed}
//                           >
//                             已收款
//                           </button>
//                         }
//                       />
//                     </li>
//                   ) : (
//                     <li key={i}>
//                       <div className="paymentModal_owner">
//                         <span name="nickName">{payment.owner.nickName}</span>
//                         <span name="name">{payment.owner.name}</span>
//                       </div>
//                       <div className="paymentModal_infos">
//                         <span name="amount">金額：{payment.amount}</span>
//                         <span name="method">
//                           {payment.method === 'transaction'
//                             ? `確認收到款項，帳號末四碼${payment.account}`
//                             : '已當面收到學費'}
//                         </span>
//                       </div>
//                     </li>
//                   );
//                 })}
//               </ul>
//               <div id="paymentModal_btnArea">
//                 <button
//                   id="paymentModal_closeBtn"
//                   className="outlineButton"
//                   onClick={this.closeModal}
//                 >
//                   關閉
//                 </button>
//               </div>
//             </div>
//           ) : null}
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   const session = state.firestore.ordered.session;
//   const paymentStatus = state.firestore.ordered.paymentStatus;
//   const user = state.firestore.ordered.user;
//   const data =
//     session && paymentStatus && user
//       ? session.map((sessionInfo) => {
//           const payments = paymentStatus
//             .filter((payment) => {
//               return payment.sessionId === sessionInfo.id;
//             })
//             .map((payment) => {
//               return {
//                 ...payment,
//                 owner: user.find((userInfo) => {
//                   return userInfo.id === payment.owner;
//                 })
//               };
//             });
//           const unpaid = [];
//           const uncheck = [];
//           const finished = [];
//           payments.forEach((paymentInfo) => {
//             if (paymentInfo.moneySent && paymentInfo.moneyReveived) {
//               finished.push(paymentInfo);
//             } else if (paymentInfo.moneySent) {
//               uncheck.push(paymentInfo);
//             } else {
//               unpaid.push(paymentInfo);
//             }
//           });
//           return {
//             name: sessionInfo.name,
//             unpaid,
//             uncheck,
//             finished
//           };
//         })
//       : null;
//   return {
//     data
//   };
// };

// export default compose(
//   connect(mapStateToProps),
//   firestoreConnect([
//     { collection: 'session' },
//     { collection: 'paymentStatus' },
//     { collection: 'user' }
//   ])
// )(PaymentStatus);
