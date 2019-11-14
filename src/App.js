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
import Info from "./components/info";
import SideMenu from "./components/sideMenu";
import Header from './components/header';

// actions

class App extends Component {
    state = {
        loggedIn: true
    };
    render() {
        return (
            <div className="App">
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
                        <Route path="/info" component={Info} />
                        <Route path="/admin" component={Admin} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect()(App);
