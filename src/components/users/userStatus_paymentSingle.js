import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// data
import theme from '../../json/theme';

const { gray1, gray4 } = theme.colors;

const PaymentContainer = styled.div`
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${gray1};
`;

const PaymentTitle = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  letter-spacing: normal;
`;

const PaymentStatus = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: ${gray4};
  letter-spacing: normal;
`;

const ListItem = styled.li`
  font-size: 1rem;
  font-weight: 400;
  color: ${gray4};
  letter-spacing: normal;
`;

const ActionText = styled.u`
  font-size: 1rem;
  font-weight: 400;
  color: ${gray4};
  letter-spacing: normal;
`;

const PaymentSingle = ({ payment }) => {
  const status = payment.moneyReceived
    ? 'finished'
    : payment.moneySent
    ? 'paid'
    : 'pending';

  return (
    <PaymentContainer>
      <PaymentTitle>{payment.sessionName}</PaymentTitle>
      <PaymentStatus>
        {status === 'finished' ? (
          <ul className="comfyList">
            <ListItem>已完成</ListItem>
          </ul>
        ) : null}
        {status === 'paid' ? (
          <ul className="comfyList">
            <ListItem>已繳費，等待芝伊確認</ListItem>
          </ul>
        ) : null}
        {status === 'pending' ? (
          <ul className="comfyList">
            <ListItem>
              未繳費 —— 如果已繳費，
              <Link to={`/payment/${payment.id}`}>
                <ActionText>點此通知芝伊</ActionText>
              </Link>
            </ListItem>
          </ul>
        ) : null}
      </PaymentStatus>
    </PaymentContainer>
  );
};

export default PaymentSingle;
