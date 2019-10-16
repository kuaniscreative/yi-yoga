import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// components
import AllClasses from './allClasses';

class LeaveApplication extends Component {
    render() {
        return (
            <div id='leaveApplication'>
               <AllClasses />    
               <Link to='/'>取消</Link>          
            </div>
        )
    } 
}

export default LeaveApplication