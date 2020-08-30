import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// components
import DateSingle from '../ui/dateSingle';

// contexts
import { userContext } from '../contexts/userContext';
import { loadingContext } from '../contexts/loadingContext';

// actions
import cancelReschedulePending from '../../actions/cancelReschedulePending';

// data
import theme from '../../json/theme.json';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const listWrapperStyle = {
  margin: '16px 0 0 0'
};

const listStyle = {
  fontSize: '14px',
  lineHeight: '1.5em',
  letterSpacing: 'normal',
  color: theme.colors.gray4
};

function getPendingOrder(students, uid) {
  for (let i = 0; i < students.length; i += 1) {
    if (students[i].id === uid) {
      return i + 1;
    }
  }

  return 0;
}

function ArrangementSingle({ leaveDate, leaveClass, classInfo, status }) {
  /** get user data */
  const { uid } = useContext(userContext);

  /** Click handler for cancel */
  const { setLoadingBarActive } = useContext(loadingContext);
  const clickHandler = () => {
    window.confirm(`是否取消候補 ${classInfo.name} ${classInfo.type} 的課程？`);

    setLoadingBarActive(true);

    cancelReschedulePending(uid, leaveClass.date, classInfo.id).then(() => {
      setLoadingBarActive(false);
    });
  };

  switch (status) {
    case 'reschedulable':
      return (
        <Container>
          <DateSingle
            date={leaveClass.date}
            time={leaveClass ? leaveClass.type : null}
          />
          <ul className="comfyList" style={listWrapperStyle}>
            <li style={listStyle}>
              尚未補課，
              <Link to="/reschedule">
                <u style={listStyle}>現在去安排</u>
              </Link>
            </li>
          </ul>
        </Container>
      );

    case 'rescheduled':
      return (
        <Container>
          <DateSingle
            date={leaveDate}
            time={leaveClass ? leaveClass.type : null}
          />
          <ul className="comfyList" style={listWrapperStyle}>
            <li
              style={listStyle}
            >{`已安排 ${classInfo.name} ${classInfo.type} 補課`}</li>
          </ul>
        </Container>
      );

    case 'pending':
      const pendingOrder = getPendingOrder(classInfo.pendingStudents, uid);
      return (
        <Container>
          <DateSingle
            date={leaveDate}
            time={leaveClass ? leaveClass.type : null}
          />
          <ul className="comfyList" style={listWrapperStyle}>
            <li
              style={listStyle}
            >{`候補 ${classInfo.name} ${classInfo.type}，順位 ${pendingOrder}`}</li>
            <li style={listStyle}>
              <button onClick={clickHandler}>
                <u style={listStyle}>取消候補</u>
              </button>
            </li>
          </ul>
        </Container>
      );

    default:
      return (
        <Container>
          <DateSingle
            date={leaveClass.date}
            time={leaveClass ? leaveClass.type : null}
          />
          <ul className="comfyList" style={listWrapperStyle}>
            <li
              style={listStyle}
            >
              本月已請假，無法補課
            </li>
          </ul>
        </Container>
      );;
  }
}

export default ArrangementSingle;
