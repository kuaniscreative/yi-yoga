import React from 'react';
import { Route } from 'react-router-dom';

// components
import Selector from './leaveApplication_selector';
import Success from './leaveApplication_success';

const LeaveApplication = () => {
  return (
    <div>
      <Route exact path="/leave-application" component={Selector} />
      <Route path="/leave-application/success" component={Success} />
    </div>
  );
};

export default LeaveApplication;
