import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

// components
import NewSession from './newSession';

class Admin extends Component {
    render() {
        return (
            <div>
                <h2>管理者頁面</h2>
                <div>
                    <Link to='/admin/new-session'>
                        報名開放
                    </Link>

                    <Route path='/admin/new-session' component={NewSession} />
                    
                </div>
            </div>
        )
    }
}

export default Admin;