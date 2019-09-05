import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Reschedule extends Component {
    render() {
        return (
            <div id='leaveApplication'>
               補課安排  
               <Link to='/'>取消</Link>               
            </div>
        )
    } 
}

export default Reschedule