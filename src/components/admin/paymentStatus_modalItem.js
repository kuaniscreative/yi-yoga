import React from 'react';
import styled from 'styled-components';

// components
import NameTag from '../ui/nameTag';

// actions
import { confirmPayment } from '../../actions/adminActions';

// data
import theme from '../../json/theme.json';

const Wrapper = styled.li`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${theme.colors.gray1};
`;

const Infos = styled.div``;

const Action = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 576px) {
    justify-content: flex-start;
    margin: 1rem 0 0.5rem 0;
  }
`;

const PaymentInfos = styled.p`
  display: block;
  line-height: 1.25em;
`;

const InfoItem = styled.span`
  color: ${theme.colors.gray4};
  font-size: 0.75rem;
`;

const ModalItem = (props) => {
  const { payment, type } = props;
  const timeAndMethodOuput =
    payment.method === 'transaction'
      ? `於 ${payment.date} 匯款，帳號末四碼：${payment.account}`
      : `於 ${payment.date} 當面繳交學費`;

  const handleClick = () => {
    window.confirm(`確認收到學生 ${payment.owner.name} 的款項？`);
    confirmPayment(payment.id);
  };

  return (
    <div className="container-fluid px-0">
      <Wrapper className="row">
        <Infos className="col-12 col-md-8">
          <NameTag
            name={payment.owner.name}
            nickName={payment.owner.nickName}
            customWrapperStyle={{ padding: '8px 0' }}
          />
          <PaymentInfos>
            <InfoItem>金額：{payment.amount}</InfoItem>
            {type === 'paid' ? (
              <InfoItem>{` | ${timeAndMethodOuput}`}</InfoItem>
            ) : null}
          </PaymentInfos>
        </Infos>
        {type === 'paid' ? (
          <Action className="col-12 col-md-4">
            <button className="outlineButton" onClick={handleClick}>
              確認收款
            </button>
          </Action>
        ) : null}
      </Wrapper>
    </div>
  );
};

export default ModalItem;
