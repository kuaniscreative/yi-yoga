import React from 'react';
import styled from 'styled-components';

const SessionTitle = styled.div`
  font-size: 1.5rem;
  letter-spacing: normal;
  margin-bottom: 0.75em;
`;
const PaymentStatusButton = styled.button`
  display: inline-block;
  position: relative;
  margin-right: 1.5rem;
  user-select: none;
`;

const Num = styled.u`
  pointer-events: none;
`;

const SessionItem = (props) => {
  const {
    sessionName,
    sessionId,
    payments,
    setModalIsActive,
    setModalData
  } = props;
  const { finished, paid, pending } = payments;

  const handleClick = (e) => {
    const type = e.target.dataset.payment;
    const data = {
      sessionName: sessionName,
      sessionId: sessionId,
      type: type
    };
    setModalData(data);
    setModalIsActive(true);
  };

  return (
    <div>
      <SessionTitle>{sessionName}</SessionTitle>
      <PaymentStatusButton data-payment="pending" onClick={handleClick}>
        未繳費：<Num>{pending.length}</Num>
      </PaymentStatusButton>
      <PaymentStatusButton data-payment="paid" onClick={handleClick}>
        待確認：<Num>{paid.length}</Num>
      </PaymentStatusButton>
      <PaymentStatusButton data-payment="finished" onClick={handleClick}>
        已完成：<Num>{finished.length}</Num>
      </PaymentStatusButton>
    </div>
  );
};

export default SessionItem;
