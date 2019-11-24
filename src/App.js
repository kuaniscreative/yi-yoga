import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

// Components
import Main from "./components/main";
import LogIn from "./components/users/logIn";
import Register from "./components/users/register";
import Reschedule from "./components/users/reschedule";
import LeaveApplication from "./components/users/leaveApplication";
import RegisterClasses from "./components/users/registerClasses";
import Admin from "./components/admin/admin";
import UserAccount from "./components/users/userAccount";
import SideMenu from "./components/sideMenu";
import Header from './components/header';
import UserStatus from './components/users/userStatus';
import LocationInfo from './components/locationInfo';
import LeaveRule from './components/leaveRule';
import RescheduleRule from './components/rescheduleRule';
import Payment from './components/users/payment';

// actions

class App extends Component {
    state = {
        loggedIn: true
    };
    render() {
        return (
            <div className="App">
                <div id='loadingBar' className={this.props.loading ? "active" : ""}>
                    <div id='loadingBar_bar'></div>
                </div>
                <BrowserRouter>
                    <Header />
                    <SideMenu />
                    <div className="mainContentWrapper">
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
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.pageControl.loading
    }
}

export default connect(mapStateToProps)(App);
