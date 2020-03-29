import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// components
import TitleBlock from '../ui/titleBlock';
import Block from '../ui/block';
import ArrowIconLink from '../ui/arrowIconLink';

// contexts
import { loadingContext } from '../contexts/loadingContext';

// actions
import rescheduleQueryAccept from '../../actions/rescheduleQueryAccept';
import rescheduleQueryDecline from '../../actions/rescheduleQueryDecline';

const LinkWrapper = styled.div`
  margin-bottom: 2rem;
`;

const RescheduleQuery = () => {
  const { result, userId, classId } = useParams();
  const [processed, setProcessed] = useState(false);
  const { setLoadingBarActive } = useContext(loadingContext);

  /** When landed, fire update functions */
  useEffect(() => {
    setLoadingBarActive(true);
    if (result === 'accept') {
      rescheduleQueryAccept(userId, classId).then(() => {
        setLoadingBarActive(false);
        setProcessed(true);
      });
    } else {
      rescheduleQueryDecline(userId, classId).then(() => {
        setLoadingBarActive(false);
        setProcessed(true);
      });
    }
  }, []);

  if (!processed) {
    return null;
  }

  return (
    <div>
      <TitleBlock title={result === 'accept' ? '補課成功' : '已取消候補'} />
      <Block>
        {result === 'accept' ? (
          <ul className="comfyList">
            <li>親愛的我們晚點見</li>
          </ul>
        ) : (
          <ul className="comfyList">
            <li>已取消本堂課的候補，並退還補課機會</li>
            <li>記得請假的課堂要在兩個月內補課完畢</li>
          </ul>
        )}
      </Block>
      <Block>
        <LinkWrapper>
          <ArrowIconLink to="/">回首頁</ArrowIconLink>
        </LinkWrapper>
      </Block>
    </div>
  );
};

export default RescheduleQuery;
