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

const Default = () => {
  return (
    <div>
      <DefaultMessage>尚未報名任何課程</DefaultMessage>
    </div>
  );
};

const ClassList = () => {
  const { userClasses } = useContext(userStatusContext);
  return (
    <div className="container-fluid px-0">
      <div className="row">
        {userClasses.length ? (
          <div className="col-12 col-md-6">
            <UserClassList classes={userClasses} />
          </div>
        ) : (
          <div className="col-12">
            <Default />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassList;
