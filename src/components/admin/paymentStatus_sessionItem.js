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
`;

const SessionItem = (props) => {
  const { name, payments } = props;
  const { finished, paid, pending } = payments;

  return (
    <div>
      <SessionTitle>{name}</SessionTitle>
      <PaymentStatusButton>
        未繳費：<u>{pending.length}</u>
      </PaymentStatusButton>
      <PaymentStatusButton>
        待確認：<u>{paid.length}</u>
      </PaymentStatusButton>
      <PaymentStatusButton>
        已完成：<u>{finished.length}</u>
      </PaymentStatusButton>
    </div>
  );
};

export default SessionItem;
