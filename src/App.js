import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

// Components
import Main from "./components/main";
import LogIn from "./components/logIn";
import Register from './components/register';
import Reschedule from './components/reschedule';
import LeaveApplication from "./components/leaveApplication";
import Admin from './components/admin/admin';


class App extends Component {
    state = {
        loggedIn: true
    };
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Route exact path="/" component={Main} />
                    <Route path="/log-in" component={LogIn} />
                    <Route path="/register" component={Register} />
                    <Route path="/reschedule" component={Reschedule} />
                    <Route
                        path="/leave-application"
                        component={LeaveApplication}
                    />

                    <Route path='/admin' component={Admin} />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
