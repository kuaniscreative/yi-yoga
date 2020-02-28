import React, { useContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

// components
import Calendar from './registerClasses_calendar';
import Modal from './registerClasses_modal';
import ProcessNav, {
  ItemWrapper,
  ItemWrapperRight,
  Hint,
  ActionButton
} from '../ui/processNav';

// contexts
import { calendarContext } from '../contexts/calendarContext';

// functions
import { toChineseString } from '../../functions/toChineseString';
import keyGen from '../../functions/keyGen';

// data
import theme from '../../json/theme.json';

const { gray6 } = theme.colors;

const MonthOptionArea = styled.div`
  margin-bottom: 1.5rem;
`;

const MonthButton = styled.button`
  padding: 8px 24px;
  border-radius: 3em;
  border: 1px solid black;
  font-weight: 500;
  margin-right: 1rem;
  background: ${(props) => (props.active ? gray6 : 'white')};
  color: ${(props) => (props.active ? 'white' : gray6)};
`;

const Nav = styled.div`
  margin: 5rem 0 3rem 0;
`;

const Instruction = styled.div`
  margin-bottom: 4rem;
  font-weight: 500;
`;

const Picker = (props) => {
  const { calendars, span } = useContext(calendarContext);
  const [inView, setInView] = useState(0);
  const [modalInView, setModalInView] = useState(false);
  const [modalSearchPattern, setModalSearchPattern] = useState({
    calendar: 0,
    dateIndex: 0
  });
  const [modalData, setModalData] = useState([]);
  useEffect(() => {
    if (calendars.length && modalSearchPattern.hasOwnProperty('calendar')) {
      const { calendar, dateIndex } = modalSearchPattern;
      setModalData(calendars[calendar][dateIndex].classes);
    }
  }, [modalSearchPattern, calendars]);

  const { toNextStep, history } = props;
  const toIndex = () => {
    history.push('/');
  };

  return (
    <div>
      <Instruction>請使用日曆選取所有想上的課堂</Instruction>
      <MonthOptionArea>
        {span.map((option, i) => {
          return (
            <MonthButton
              active={inView === i}
              onClick={() => {
                setInView(i);
              }}
              key={keyGen()}
            >
              {`${toChineseString(option.month + 1)}月`}
            </MonthButton>
          );
        })}
      </MonthOptionArea>
      <Calendar
        data={calendars[inView] || []}
        calendarIndex={inView}
        setModalInView={setModalInView}
        setModalSearchPattern={setModalSearchPattern}
      />
      <Modal
        isActive={modalInView}
        setModalIsActive={setModalInView}
        modalData={modalData}
      />
      <Nav>
        <ProcessNav>
          <ItemWrapper>
            <Hint>上一步</Hint>
            <ActionButton onClick={toIndex}>回首頁</ActionButton>
          </ItemWrapper>
          <ItemWrapperRight>
            <Hint>下一步</Hint>
            <ActionButton onClick={toNextStep}>確認所選課堂</ActionButton>
          </ItemWrapperRight>
        </ProcessNav>
      </Nav>
    </div>
  );
};

export default withRouter(Picker);
