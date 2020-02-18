import React from 'react';

// compoonents
import Block from '../ui/block';
import Subtitle from '../ui/subtitle';
import ArrowIconLink from '../ui/arrowIconLink';

const Success = () => {
  return (
    <Block>
      <Subtitle title="課程新增成功!">同學現在可以報名課程了</Subtitle>
      <div className="container-fluid px-0">
        <div className="row">
          <div className="col-6">
            <ArrowIconLink to="/">回首頁</ArrowIconLink>
          </div>
          <div className="col-6"></div>
        </div>
      </div>
    </Block>
  );
};

export default Success;
