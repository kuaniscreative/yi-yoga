import React, { useContext } from 'react';

// components
import ClassListItem from './leaveApplication_classListItem';
// contexts
import { userStatusContext } from '../contexts/userStatusContext';

// functions
import keyGen from '../../functions/keyGen';

const ClassList = () => {
  const { userClasses } = useContext(userStatusContext);

  return (
    <div className="container-fluid px-0">
      <div className="row">
        <ul className="col-12 col-md-6">
          {userClasses.map((classInfo) => {
            return <ClassListItem classInfo={classInfo} key={keyGen()} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default ClassList;
