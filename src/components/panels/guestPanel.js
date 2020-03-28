import React, { useContext } from 'react';
import { Route } from 'react-router-dom';

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
import { navContext } from '../contexts/navContext';

// json
import navData from '../../json/guestNav';

const GuestPanel = () => {
  const {
    navIsActive,
    setNavIsActive,
    headerBackground,
    setHeaderBackground
  } = useContext(navContext);

  return (
    <SignUpContext>
      <div>
        <Header
          headerBackground={headerBackground}
          setHeaderBackground={setHeaderBackground}
          navIsActive={navIsActive}
          setNavIsActive={setNavIsActive}
        />
        <Navigation
          data={navData}
          navIsActive={navIsActive}
          setNavIsActive={setNavIsActive}
          setHeaderBackground={setHeaderBackground}
        />
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
