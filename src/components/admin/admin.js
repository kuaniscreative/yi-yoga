import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

// components
import NewSession from './newSession';

class Admin extends Component {
    render() {
        return (
            <div>
                <div id='admin'>
                    <Route path='/admin/new-session' component={NewSession} />
                </div>
            </div>
        )
    }
}

export default Admin;