import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

// components
import NewSession from './newSession';
import ClassList from './classList';
import PaymentStatus from './paymentStatus';

class Admin extends Component {
    render() {
        return (
            <div>
                <div id='admin'>
                    <Route path='/admin/new-session' component={NewSession} />
                    <Route path='/admin/classList' component={ClassList} />
                    <Route path='/admin/paymentStatus' component={PaymentStatus} />
                </div>
            </div>
        )
    }
}

export default Admin;