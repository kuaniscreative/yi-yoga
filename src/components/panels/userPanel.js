import React, { useContext } from 'react';
import { Route } from 'react-router-dom';

// components
import UserIndex from '../users/userIndex';
import Reschedule from '../users/reschedule';
import LeaveApplication from '../users/leaveApplication';
import RegisterClasses from '../users/registerClasses';
import UserAccount from '../users/userAccount';
import Navigation from '../ui/navigation';
import Header from '../ui/header';
import UserStatus from '../users/userStatus';
import LocationInfo from '../locationInfo';
import LeaveRule from '../leaveRule';
import RescheduleRule from '../rescheduleRule';
import Payment from '../users/payment';

// data
import navData from '../../json/userNav';

// contexts
import { userContext } from '../contexts/userContext';
import { navContext } from '../contexts/navContext';
import RegisterClassContextProvider from '../contexts/registerClassContext';
import OpeningSessionContextProvider from '../contexts/openingSessionContext';
import AllClassContextProvider from '../contexts/allClassContext';

const UserPanel = () => {
  const { validated } = useContext(userContext);
  const divisions = navData.divisions;
  const filteredData = validated
    ? navData
    : {
        divisions: divisions.filter((division) => {
          return division.name !== '課程管理';
        }),
        logoutSection: true
      };
  const {
    navIsActive,
    setNavIsActive,
    headerBackground,
    setHeaderBackground
  } = useContext(navContext);

  return (
    <div>
      <Header
        headerBackground={headerBackground}
        setHeaderBackground={setHeaderBackground}
        navIsActive={navIsActive}
        setNavIsActive={setNavIsActive}
      />
      <Navigation
        data={filteredData}
        navIsActive={navIsActive}
        setNavIsActive={setNavIsActive}
        setHeaderBackground={setHeaderBackground}
      />
      <Route exact path="/" component={UserIndex} />
      <Route path="/reschedule" component={Reschedule} />
      <Route path="/register-classes">
        <AllClassContextProvider>
          <OpeningSessionContextProvider>
            <RegisterClassContextProvider>
              <RegisterClasses />
            </RegisterClassContextProvider>
          </OpeningSessionContextProvider>
        </AllClassContextProvider>
      </Route>
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
