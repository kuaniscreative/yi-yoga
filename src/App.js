import React, { useContext, useEffect } from 'react';
import { Route } from 'react-router-dom';

// Components
import RescheduleQuery from './components/users/rescheduleQuery';
import SignUpSuccess from './components/users/signUpSuccess';
import GuestPanel from './components/panels/guestPanel';
import UserPanel from './components/panels/userPanel';
import AdminPanel from './components/panels/adminPanel';

// contexts
import { userContext } from './components/contexts/userContext';
import LoadingContextProvider from './components/contexts/loadingContext';
import NavContextProvider from './components/contexts/navContext';

// actions
import removeExpireClassProfile from './actions/removeExpireClassProfile';

const App = () => {
  const { uid, isAdmin } = useContext(userContext);

  /** remove expired classes when first render */
  useEffect(() => {
    removeExpireClassProfile();
  }, []);

  return (
    <div className="App">
      <LoadingContextProvider>
        <NavContextProvider>
          {isAdmin ? <AdminPanel /> : uid ? <UserPanel /> : <GuestPanel />}
          <Route
            path="/rescheduleQuery/:result?/:userId?/:classId?/:date?"
            component={RescheduleQuery}
          />
          <Route path="/signUpSuccess" component={SignUpSuccess} />
        </NavContextProvider>
      </LoadingContextProvider>
    </div>
  );
};

export default App;
