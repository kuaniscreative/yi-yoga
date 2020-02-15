import React, { useState } from 'react';
import { Route } from 'react-router-dom';

// components
import NewSession from '../admin/newSession';
import ClassList from '../admin/classList';
import PaymentStatus from '../admin/paymentStatus';
import NewStudent from '../admin/newStudent';
import Header from '../admin/header';
import Navigation from '../ui/navigation';

// context
import AllUserContext from '../contexts/allUserContext';

// json
import sideMenuData from '../../json/adminSideMenu';

const AdminPanel = () => {
  const [navIsActive, setNavIsActive] = useState(true);

  return (
    <AllUserContext>
      <div id="admin">
        <Header navIsActive={navIsActive} setNavIsActive={setNavIsActive} />
        <Navigation
          data={sideMenuData}
          navIsActive={navIsActive}
          setNavIsActive={setNavIsActive}
        />
        <Route path="/new-session" component={NewSession} />
        <Route path="/classList" component={ClassList} />
        <Route path="/paymentStatus" component={PaymentStatus} />
        <Route path="/newStudent" component={NewStudent} />
      </div>
    </AllUserContext>
  );
};

export default AdminPanel;
