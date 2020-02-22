import React from 'react';
import styled from 'styled-components';

const SessionTitle = styled.div`
  font-size: 1.5rem;
  letter-spacing: normal;
`;

const SessionItem = (props) => {
  const { name, payments } = props;
  return (
    <div>
      <SessionTitle>{name}</SessionTitle>
    </div>
  );
};

export default SessionItem;
