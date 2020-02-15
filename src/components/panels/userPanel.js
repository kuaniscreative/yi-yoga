import React, { useContext } from 'react';
import { Route } from 'react-router-dom';

// components
import UserIndex from '../users/userIndex';
import Reschedule from '../users/reschedule';
import LeaveApplication from '../users/leaveApplication';
import RegisterClasses from '../users/registerClasses';
import UserAccount from '../users/userAccount';
import SideMenu from '../ui/sideMenu';
import Header from '../ui/header';
import UserStatus from '../users/userStatus';
import LocationInfo from '../locationInfo';
import LeaveRule from '../leaveRule';
import RescheduleRule from '../rescheduleRule';
import Payment from '../users/payment';

// data
import sideMenuData from '../../json/userSideMenu';

// contexts
import { userContext } from '../contexts/userContext';

const UserPanel = () => {
  const { validated } = useContext(userContext);
  const divisions = sideMenuData.divisions;
  const filteredData = validated
    ? sideMenuData
    : {
        divisions: divisions.filter((division) => {
          return division.name !== '課程管理';
        }),
        logoutSection: true
      };

  return (
    <div>
      <Header />
      <SideMenu data={filteredData} />
      <Route exact path="/" component={UserIndex} />
      <Route path="/reschedule" component={Reschedule} />
      <Route path="/register-classes" component={RegisterClasses} />
      <Route path="/leave-application" component={LeaveApplication} />
      <Route path="/userAccount" component={UserAccount} />
      <Route path="/userStatus" component={UserStatus} />
      <Route path="/locationInfo" component={LocationInfo} />
      <Route path="/leaveRule" component={LeaveRule} />
      <Route path="/rescheduleRule" component={RescheduleRule} />
      <Route path="/payment/:paymentId" component={Payment} />
    </div>
  );
};

export default UserPanel;
