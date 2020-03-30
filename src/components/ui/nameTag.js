import React from 'react';
import styled from 'styled-components';

const Name = styled.span`
  font-size: 1rem;
  margin-right: 1rem;
`;
const NickName = styled.span`
  font-size: 0.75rem;
`;

const NameTag = (props) => {
  const { name, nickName, customWrapperStyle } = props;
  return (
    <div style={customWrapperStyle}>
      <Name>{name}</Name>
      <NickName>{nickName}</NickName>
    </div>
  );
};

export default NameTag;
