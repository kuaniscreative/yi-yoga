import React from 'react';
import styled from 'styled-components';

// components
import { ReactComponent as Arrow } from '../../static/arrow.svg';

// data
import theme from '../../json/theme.json';

const RowNoWrap = styled.div`
  padding: 2rem 3rem;
  padding-top: 1rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 576px) {
    flex-wrap: nowrap;
    padding-right: 0;
    padding-left: 0;
  }
`;
const ScrollHint = styled.div`
  display: none;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${theme.colors.gray2};
  vertical-align: middle;
  user-select: none;

  span {
    padding-right: 4px;
  }

  @media (max-width: 576px) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

const FullWidthScrollableBlock = (props) => {
  const { children } = props;
  return (
    <div className="container-fluid">
      <div className="row">
        {children.length > 0 ? (
          <div className="col-4 offset-8">
            <ScrollHint>
              <span>滑動檢視</span>
              <Arrow stroke={theme.colors.gray2} width="18" height="18" />
            </ScrollHint>
          </div>
        ) : null}
      </div>
      <RowNoWrap className="row">{children}</RowNoWrap>
    </div>
  );
};

export default FullWidthScrollableBlock;
