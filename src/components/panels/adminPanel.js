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
import AllUserContextProvider from '../contexts/allUserContext';
import NewSessionContextProvider from '../contexts/newSessionContext';
import RegularCourseContextProvider from '../contexts/regularCourseContext';
import AllClassContextProvider from '../contexts/allClassContext';
import ClassListContextProvider from '../contexts/classListContext';
import AllPaymentContextProvider from '../contexts/allPaymentContext';
import SessionContextProvider from '../contexts/sessionContext';

// json
import sideMenuData from '../../json/adminSideMenu';

const AdminPanel = () => {
  const [navIsActive, setNavIsActive] = useState(true);
  const [headerBackground, setHeaderBackground] = useState('white');

  return (
    <AllUserContextProvider>
      <RegularCourseContextProvider>
        <AllClassContextProvider>
          <div id="admin">
            <Header
              headerBackground={headerBackground}
              setHeaderBackground={setHeaderBackground}
              navIsActive={navIsActive}
              setNavIsActive={setNavIsActive}
            />
            <Navigation
              data={sideMenuData}
              navIsActive={navIsActive}
              setNavIsActive={setNavIsActive}
              setHeaderBackground={setHeaderBackground}
            />
            <Switch>
              <Route exact path="/" component={AdminIndex} />
              <Route path="/new-session">
                <NewSessionContextProvider>
                  <NewSession />
                </NewSessionContextProvider>
              </Route>
              <Route path="/classList">
                <ClassListContextProvider>
                  <ClassList />
                </ClassListContextProvider>
              </Route>
              <Route path="/paymentStatus">
                <AllPaymentContextProvider>
                  <SessionContextProvider>
                    <PaymentStatus />
                  </SessionContextProvider>
                </AllPaymentContextProvider>
              </Route>
              <Route path="/newStudent" component={NewStudent} />
            </Switch>
          </div>
        </AllClassContextProvider>
      </RegularCourseContextProvider>
    </AllUserContextProvider>
  );
};

export default AdminPanel;
