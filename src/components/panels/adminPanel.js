import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

// components
import AdminIndex from '../admin/adminIndex';
import NewSession from '../admin/newSession';
import ClassList from '../admin/classList';
import PaymentStatus from '../admin/paymentStatus';
import NewStudent from '../admin/newStudent';
import Header from '../admin/header';
import Navigation from '../ui/navigation';

// context
import AllUserContext from '../contexts/allUserContext';
import NewSessionContext from '../contexts/newSessionContext';
import RegularCourseContextProvider from '../contexts/regularCourseContext';

// json
import sideMenuData from '../../json/adminSideMenu';

const AdminPanel = () => {
  const [navIsActive, setNavIsActive] = useState(true);

  return (
    <AllUserContext>
      <RegularCourseContextProvider>
        <div id="admin">
          <Header navIsActive={navIsActive} setNavIsActive={setNavIsActive} />
          <Navigation
            data={sideMenuData}
            navIsActive={navIsActive}
            setNavIsActive={setNavIsActive}
          />
          <Switch>
            <Route exact path="/" component={AdminIndex} />
            <Route path="/new-session">
              <NewSessionContext>
                <NewSession />
              </NewSessionContext>
            </Route>
            <Route path="/classList" component={ClassList} />
            <Route path="/paymentStatus" component={PaymentStatus} />
            <Route path="/newStudent" component={NewStudent} />
          </Switch>
        </div>
      </RegularCourseContextProvider>
    </AllUserContext>
  );
};

export default AdminPanel;
