import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

// components
import UserIndex from '../users/userIndex';
import Reschedule from '../users/reschedule';
import LeaveApplication from '../users/leaveApplication';
import RegisterClasses from '../users/registerClasses';
import Navigation from '../ui/navigation';
import Header from '../ui/header';
import UserStatus from '../users/userStatus';
import LocationInfo from '../locationInfo';
import LeaveRule from '../leaveRule';
import RescheduleRule from '../rescheduleRule';
// import Payment from '../users/payment';

// data
import navData from '../../json/userNav';

// contexts
import { userContext } from '../contexts/userContext';
import { navContext } from '../contexts/navContext';
import RegisterClassContextProvider from '../contexts/registerClassContext';
import OpeningSessionContextProvider from '../contexts/openingSessionContext';
import AllClassContextProvider from '../contexts/allClassContext';
import UserStatusContextProvider from '../contexts/userStatusContext';
import LeaveContextProvider from '../contexts/leaveContext';
import RescheduleContextProvider from '../contexts/rescheduleContext';

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
      <AllClassContextProvider>
        <UserStatusContextProvider>
          <Switch>
            <Route exact path="/" component={UserIndex} />
            <Route path="/reschedule">
              <RescheduleContextProvider>
                <Reschedule />
              </RescheduleContextProvider>
            </Route>
            <Route path="/register-classes">
              <OpeningSessionContextProvider>
                <RegisterClassContextProvider>
                  <RegisterClasses />
                </RegisterClassContextProvider>
              </OpeningSessionContextProvider>
            </Route>
            <Route path="/leave-application">
              <LeaveContextProvider>
                <LeaveApplication />
              </LeaveContextProvider>
            </Route>

            <Route path="/userStatus" component={UserStatus} />
            <Route path="/locationInfo" component={LocationInfo} />
            <Route path="/leaveRule" component={LeaveRule} />
            <Route path="/rescheduleRule" component={RescheduleRule} />
            {/* <Route path="/payment/:paymentId" component={Payment} /> */}
          </Switch>
        </UserStatusContextProvider>
      </AllClassContextProvider>
    </div>
  );
};

export default UserPanel;
