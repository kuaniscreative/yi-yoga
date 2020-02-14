import React from 'react';
import { Link, Route } from 'react-router-dom';

// components
import GuestIndex from '../guest/guestIndex';
import LogIn from '../guest/logIn';
import SignUp from '../guest/signUp';
import SideMenu from '../ui/sideMenu';
import Header from '../ui/header';

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
      </div>
    </SignUpContext>
  );
};

export default GuestPanel;
