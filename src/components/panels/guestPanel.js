import React from 'react';
import { Link, Route } from 'react-router-dom';

// components
import GuestIndex from '../guest/guestIndex';
import LogIn from '../guest/logIn';
import SignUp from '../guest/signUp';
import SideMenu from '../ui/sideMenu';
import Header from '../ui/header';
import LocationInfo from '../locationInfo';
import LeaveRule from '../leaveRule';
import RescheduleRule from '../rescheduleRule';

// contexts
import SignUpContext from '../contexts/signUpContext';

// json
import sideMenuData from '../../json/guestSideMenu';

const GuestPanel = () => {
  return (
    <SignUpContext>
      <div id="guestPanel">
        <Header />
        <SideMenu data={sideMenuData} />
        <Route exact path="/" component={GuestIndex} />
        <Route path="/log-in" component={LogIn} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/locationInfo" component={LocationInfo} />
        <Route path="/leaveRule" component={LeaveRule} />
        <Route path="/rescheduleRule" component={RescheduleRule} />
      </div>
    </SignUpContext>
  );
};

export default GuestPanel;
