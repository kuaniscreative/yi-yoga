import React from 'react';
import { Link, Route } from 'react-router-dom';

// components
import GuestIndex from '../guest/guestIndex';
import LogIn from '../guest/logIn';
import SignUp from '../guest/signUp';
import Navigation from '../ui/navigation';
import Header from '../ui/header';
import LocationInfo from '../locationInfo';
import LeaveRule from '../leaveRule';
import RescheduleRule from '../rescheduleRule';

// contexts
import SignUpContext from '../contexts/signUpContext';

// json
import navData from '../../json/guestNav';

const GuestPanel = () => {
  return (
    <SignUpContext>
      <div id="guestPanel">
        <Header />
        <Navigation data={navData} />
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
