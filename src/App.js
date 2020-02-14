import React, { Component } from 'react';
import { BrowserRouter, Route, HashRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, getFirebase } from 'react-redux-firebase';

// Components
// import LogIn from './components/users/logIn';
// import SignUp from './components/users/signUp';
// import Reschedule from './components/users/reschedule';
// import LeaveApplication from './components/users/leaveApplication';
// import RegisterClasses from './components/users/registerClasses';
// import UserAccount from './components/users/userAccount';
// import Header from './components/ui/header';
// import UserStatus from './components/users/userStatus';
// import LocationInfo from './components/locationInfo';
// import LeaveRule from './components/leaveRule';
// import RescheduleRule from './components/rescheduleRule';
// import Payment from './components/users/payment';
import RescheduleQuery from './components/users/rescheduleQuery';
import SignUpSuccess from './components/users/signUpSuccess';
import GuestPanel from './components/panels/guestPanel';
import UserPanel from './components/panels/userPanel';
import AdminPanel from './components/panels/adminPanel';

// contexts
import { userContext } from './components/contexts/userContext';

// actions
import {
  removeExpireClassProfile,
  removeExpireUserClasses
} from './actions/systemActions';
class App extends Component {
  state = {
    loggedIn: true
  };

  static contextType = userContext;

  componentDidMount() {
    this.props.removeExpireClassProfile();
    const firebase = getFirebase();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.removeExpireUserClasses(user.uid);
      } else {
        console.log('Nouser');
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div id="loadingBar" className={this.props.loading ? 'active' : ''}>
          <div id="loadingBar_bar"></div>
        </div>
        <HashRouter basename="/">
          {this.context.isAdmin ? (
            <AdminPanel />
          ) : this.context.uid ? (
            <UserPanel />
          ) : (
            <GuestPanel />
          )}
          {/* <HashRouter basename='/'>
                    <Header />
                    <SideMenu />
                        <Route exact path="/" component={Main} />
                        <Route path="/log-in" component={LogIn} />
                        <Route path="/register" component={Register} />
                        <Route path="/reschedule" component={Reschedule} />
                        <Route
                            path="/register-classes"
                            component={RegisterClasses}
                        />
                        <Route
                            path="/leave-application"
                            component={LeaveApplication}
                        />
                        <Route path="/userAccount" component={UserAccount} />
                        <Route path="/admin" component={Admin} />
                        <Route path="/userStatus" component={UserStatus} />
                        <Route path="/locationInfo" component={LocationInfo} />
                        <Route path="/leaveRule" component={LeaveRule} />
                        <Route path="/rescheduleRule" component={RescheduleRule} />
                        <Route path="/payment/:paymentId" component={Payment} />
                        <Route path='/rescheduleQuery/:result?/:userId?/:classId?/:date?' component={RescheduleQuery} />
                </HashRouter> */}
          <Route
            path="/rescheduleQuery/:result?/:userId?/:classId?/:date?"
            component={RescheduleQuery}
          />
          <Route path="/signUpSuccess" component={SignUpSuccess} />
        </HashRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.pageControl.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeExpireClassProfile: () => {
      dispatch(removeExpireClassProfile());
    },
    removeExpireUserClasses: (uid) => {
      dispatch(removeExpireUserClasses(uid));
    }
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'user' }])
)(App);
