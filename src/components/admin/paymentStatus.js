import React, { useContext, useState } from 'react';

// components
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

  const [modalData, setModalData] = useState({});
  const [modlaIsActive, setModalIsActive] = useState(false);

  return (
    <div>
      <TitleBlock title="付款狀況" />
      <Block>
        {sessionData.map((sessionInfo) => {
          return (
            <SessionItem
              sessionName={sessionInfo.name}
              sessionId={sessionInfo.id}
              payments={sessionInfo.payments}
              setModalData={setModalData}
              setModalIsActive={setModalIsActive}
              key={keyGen()}
            />
          );
        })}
      </Block>
      <Modal
        sessionData={sessionData}
        modalData={modalData}
        isActive={modlaIsActive}
        setModalIsActive={setModalIsActive}
      />
    </div>
  );
};

export default PaymentStatus;
