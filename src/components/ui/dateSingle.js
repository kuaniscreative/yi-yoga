import React from 'react';
import styled from 'styled-components';

// data
import theme from '../../json/theme.json';

const Wrapper = styled.div``;

const FullDate = styled.div`
  font-weight: 500;
  line-height: 2em;
  letter-spacing: normal;
  color: ${({ disabled }) =>
    disabled ? theme.colors.gray2 : theme.colors.black};
`;
const Time = styled.div`
  font-size: 0.9rem;
  line-height: 1em;
  color: ${({ disabled }) =>
    disabled ? theme.colors.gray2 : theme.colors.gray4};
`;
const TimeItem = styled.span`
  padding-right: 0.5rem;
  letter-spacing: normal;
`;

const DateSingle = ({ date, disabled }) => {
  const yyyy = date.getFullYear();
  const mm = date.getMonth();
  const dd = date.getDate();
  const hr = date.getHours();
  const min = date.getMinutes();
  const startAt = `${hr}:${min}`;
  const day = date.getDay();
  const dayOutput = `週${day.toLocaleString('zh-u-nu-hanidec')}`;
  return (
    <Wrapper>
      <FullDate disabled={disabled}>{`${yyyy}年${mm + 1}月${dd}日`}</FullDate>
      <Time disabled={disabled}>
        <TimeItem>{dayOutput}</TimeItem>
        <TimeItem>{startAt}</TimeItem>
      </Time>
    </Wrapper>
  );
};

export default DateSingle;
