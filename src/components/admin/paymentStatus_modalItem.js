import React from 'react';
import styled from 'styled-components';

// components
import NameTag from '../ui/nameTag';

// data
import theme from '../../json/theme.json';

const Wrapper = styled.li`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${theme.colors.gray1};
`;

const Infos = styled.p`
  display: block;
  padding: 0.5rem 0;
`;

const InfoItem = styled.span`
  color: ${theme.colors.gray4};
  font-size: 0.75rem;
  padding-top: 1em;
`;

const ModalItem = (props) => {
  const { payment, type } = props;
  const timeAndMethodOuput =
    payment.method === 'transaction'
      ? `於 ${payment.date} 匯款，帳號末四碼：${payment.account}`
      : `於 ${payment.date} 當面繳交學費`;
  return (
    <Wrapper>
      <NameTag name={payment.owner.name} nickName={payment.owner.nickName} />
      <Infos>
        <InfoItem>金額：{payment.amount}</InfoItem>
        {type === 'paid' ? (
          <InfoItem>{` | ${timeAndMethodOuput}`}</InfoItem>
        ) : null}
      </Infos>
    </Wrapper>
  );
};

export default ModalItem;
