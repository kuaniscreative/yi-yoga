import React from 'react';

// components
import StudentCard from './studentCard';

// functions
import keyGen from '../../functions/keyGen';

const NewStudentList = (props) => {
  const { newStudents } = props;
  return (
    <div className="col-10 container-fluid">
      <div className="row">
        {newStudents.map((student) => {
          return (
            <div
              className="col-12 col-md-6 col-lg-4 px-0 px-md-2"
              key={keyGen()}
            >
              <StudentCard data={student} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewStudentList;
