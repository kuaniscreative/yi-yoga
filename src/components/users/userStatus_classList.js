import React, { useContext } from 'react';
import styled from 'styled-components';

// components
import UserClassList from './userStatus_userClassList';

// contexts
import { userStatusContext } from '../contexts/userStatusContext';

// data
import theme from '../../json/theme.json';

const { gray3 } = theme.colors;

const DefaultMessage = styled.p`
  font-weight: 500;
  color: ${gray3};
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 2rem;
`;

const Default = () => {
  return (
    <div>
      <DefaultMessage>尚未報名任何課程</DefaultMessage>
    </div>
  );
};

const ClassList = () => {
  const { userClasses, rescheduledInfos } = useContext(userStatusContext);

  const rescheduledClasses = rescheduledInfos ? rescheduledInfos.map(({ rescheduleClass }) => {
    return rescheduleClass
  }) : [];

  return (
    <div className="container-fluid px-0">
      <div className="row">
        {userClasses.length ? (
          <div className="col-12 col-md-6">
            <Title>課程：</Title>
            <UserClassList classes={userClasses} />
          </div>
        ) : null}
        {rescheduledClasses.length ? (
          <div className="col-12 col-md-6">
            <Title>補課課程：</Title>
            <UserClassList classes={rescheduledClasses} />
          </div>
        ) : null}
        {!userClasses.length && !rescheduledClasses.length ? (
          <div className="col-12">
            <Default />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ClassList;
