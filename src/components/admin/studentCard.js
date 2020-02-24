import React from 'react';
import styled from 'styled-components';

// components
import NameTag from '../ui/nameTag';

//actions
import { validateStudent } from '../../actions/adminActions';

// data
import theme from '../../json/theme.json';

const Card = styled.div`
  padding: 2rem 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid ${theme.colors.gray2};
  border-radius: 4px;
`;
const Infos = styled.div`
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${theme.colors.gray1};
  margin-bottom: 1.5rem;
`;

const Email = styled.p`
  padding-top: 1em;
  font-size: 0.8rem;
`;

const Message = styled.div`
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: ${theme.colors.gray4};
`;

const Action = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 3rem;
`;

const StudentCard = (props) => {
  const { name, nickName, email, message, id } = props.data;
  const handleClick = (e) => {
    const id = e.target.dataset.id;
    const proceed = window.confirm(`確認開放 ${name} 所有功能`);
    if (proceed) {
      validateStudent(id);
    }
  };
  return (
    <Card>
      <Infos>
        <NameTag name={name} nickName={nickName} />
        <Email>{email}</Email>
      </Infos>
      <Message>
        <p>{message}</p>
      </Message>
      <Action>
        <button className="outlineButton" data-id={id} onClick={handleClick}>
          開放使用
        </button>
      </Action>
    </Card>
  );
};

export default StudentCard;
