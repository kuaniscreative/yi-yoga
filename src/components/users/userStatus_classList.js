import React, { useContext } from 'react';
import styled from 'styled-components';

// components
import List, { ListItem } from '../ui/bottomLineList';
import DateSingle from '../ui/dateSingle';
import UserClassList from './userStatus_userClassList';

// contexts
import { userStatusContext } from '../contexts/userStatusContext';

// functions
import keyGen from '../../functions/keyGen';

// data
import theme from '../../json/theme.json';

const ClassList = () => {
  const { userClasses, rescheduleClasses } = useContext(userStatusContext);
  return (
    <div className="container-fluid px-0">
      <div className="row">
        {userClasses.length ? (
          <div className="col-12 col-md-6">
            <UserClassList classes={userClasses} />
          </div>
        ) : null}
        {rescheduleClasses.length ? (
          <div className="col-12 col-md-6">
            <UserClassList classes={rescheduleClasses} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ClassList;
