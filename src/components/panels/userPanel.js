import React from 'react';
import { Route, HashRouter } from 'react-router-dom';

// components
import UserIndex from '../users/userIndex';
import Reschedule from '../users/reschedule';
import LeaveApplication from '../users/leaveApplication';
import RegisterClasses from '../users/registerClasses';
import UserAccount from '../users/userAccount';
import SideMenu from '../sideMenu';
import Header from '../header';
import UserStatus from '../users/userStatus';
import LocationInfo from '../locationInfo';
import LeaveRule from '../leaveRule';
import RescheduleRule from '../rescheduleRule';
import Payment from '../users/payment';

const UserPanel = () => {
  return (
    <div>
      <Header />
      <SideMenu />
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
