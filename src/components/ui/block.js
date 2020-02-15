import React from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  padding-top: 32px;
  padding-bottom: 32px;
`;

const Block = (props) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <ContentWrapper className="col-12 col-md-10">
          {props.children}
        </ContentWrapper>
      </div>
    </div>
  );
};

export default Block;
