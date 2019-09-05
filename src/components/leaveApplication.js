import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LeaveApplication extends Component {
    render() {
        return (
            <div id='leaveApplication'>
               請假申請       
               <Link to='/'>取消</Link>          
            </div>
        )
    } 
}

export default LeaveApplication