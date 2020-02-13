import React from 'react';
import { Route } from 'react-router-dom';

// components
import NewSession from '../admin/newSession';
import ClassList from '../admin/classList';
import PaymentStatus from '../admin/paymentStatus';
import NewStudent from '../admin/newStudent';
import SideMenu from '../ui/sideMenu';
import Header from '../ui/header';

// context
import AllUserContext from '../contexts/allUserContext';

// json
import sideMenuData from '../../json/adminSideMenu';

const AdminPanel = () => {
  return (
    <AllUserContext>
      <div id="admin">
        <Header />
        <SideMenu data={sideMenuData} />
        <Route path="/new-session" component={NewSession} />
        <Route path="/classList" component={ClassList} />
        <Route path="/paymentStatus" component={PaymentStatus} />
        <Route path="/newStudent" component={NewStudent} />
      </div>
    </AllUserContext>
  );
};

export default AdminPanel;
