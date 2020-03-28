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

const DateAndMonth = styled.span`
  margin-right: 1rem;
`;

const Infos = styled.div`
  span {
    font-size: 0.9rem;
    line-height: 1em;
    margin-right: 16px;
    letter-spacing: normal;
    color: ${theme.colors.gray4};
  }
`;

const DateSingle = ({ date, time, disabled, oneline, extraInfo }) => {
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
      <FullDate disabled={disabled}>
        <DateAndMonth>{`${yyyy}年${mm + 1}月${dd}日`}</DateAndMonth>
        {oneline ? <Time>{time}</Time> : null}
      </FullDate>
      {oneline ? null : (
        <Time disabled={disabled}>
          <TimeItem>{dayOutput}</TimeItem>
          <TimeItem>{startAt}</TimeItem>
        </Time>
      )}
      {extraInfo ? <Infos>{extraInfo}</Infos> : null}
    </Wrapper>
  );
};

export default DateSingle;
