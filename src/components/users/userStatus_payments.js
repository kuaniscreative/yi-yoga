import React, { useContext } from 'react';

// components
import PaymentSingle from './userStatus_paymentSingle';

// context
import { userStatusContext } from '../contexts/userStatusContext';

// function
import keyGen from '../../functions/keyGen';

const Payments = () => {
  /** Get payments from context */
  const { payments } = useContext(userStatusContext);

  return (
    <div>
      {payments.map((payment) => {
        return <PaymentSingle payment={payment} key={keyGen()} />;
      })}
    </div>
  );
};

export default Payments;
