import React from 'react';
import styled from 'styled-components';

const RowNoWrap = styled.div`
  flex-wrap: nowrap;
  padding-top: 32px;
  padding-bottom: 32px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FullWidthScrollableBlock = (props) => {
  const { children } = props;
  return (
    <div className="container-fluid">
      <RowNoWrap className="row">{children}</RowNoWrap>
    </div>
  );
};

export default FullWidthScrollableBlock;
