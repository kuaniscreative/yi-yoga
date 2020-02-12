import React from 'react';
import { Route } from 'react-router-dom';

// components
import NewSession from '../admin/newSession';
import ClassList from '../admin/classList';
import PaymentStatus from '../admin/paymentStatus';
import NewStudent from '../admin/newStudent';

const AdminPanel = () => {
  return (
    <div id="admin">
      <Route path="/new-session" component={NewSession} />
      <Route path="/classList" component={ClassList} />
      <Route path="/paymentStatus" component={PaymentStatus} />
      <Route path="/newStudent" component={NewStudent} />
    </div>
  );
};

export default AdminPanel;
