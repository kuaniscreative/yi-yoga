import React from 'react';
import styled from 'styled-components';

// compoonents
import Block from '../ui/block';
import Subtitle from '../ui/subtitle';
import ArrowIconLink from '../ui/arrowIconLink';

const ButtonArea = styled.div`
  margin-top: 5rem;
`;

const Success = () => {
  return (
    <Block>
      <Subtitle title="課程新增成功!">同學現在可以報名課程了:)</Subtitle>
      <ButtonArea className="container-fluid px-0">
        <div className="row">
          <div className="col-6">
            <ArrowIconLink to="/">回首頁</ArrowIconLink>
          </div>
          <div className="col-6"></div>
        </div>
      </ButtonArea>
    </Block>
  );
};

export default Success;
