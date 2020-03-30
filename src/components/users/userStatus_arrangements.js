import React, { useContext } from 'react';
import styled from 'styled-components';

// components
import ArrangementSingle from './userStatus_arrangementSingle';

// contexts
import { userStatusContext } from '../contexts/userStatusContext';

// functions
import keyGen from '../../functions/keyGen';

const Title = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 2rem;
`;

const Arrangements = () => {
  const {
    rescheduledInfos,
    reschedulePending,
    reschedulableClasses
  } = useContext(userStatusContext);

  return (
    <div className="contianer-fluid px-0">
      <div className="row">
        <Title className="col-12">請假課程：</Title>
        {reschedulableClasses.length ? (
          <div className="col-12">
            {reschedulableClasses.map((classInfo) => {
              return (
                <ArrangementSingle
                  leaveClass={classInfo}
                  status="reschedulable"
                  key={keyGen()}
                />
              );
            })}
          </div>
        ) : null}
        {rescheduledInfos.length ? (
          <div className="col-12">
            {rescheduledInfos.map((infos) => {
              return (
                <ArrangementSingle
                  leaveDate={infos.leaveDate}
                  leaveClass={infos.leaveClass}
                  classInfo={infos.rescheduleClass}
                  status="rescheduled"
                  key={keyGen()}
                />
              );
            })}
          </div>
        ) : null}
        {reschedulePending.length ? (
          <div className="col-12">
            {reschedulePending.map((infos) => {
              return (
                <ArrangementSingle
                  leaveDate={infos.leaveDate}
                  leaveClass={infos.leaveClass}
                  classInfo={infos.pendingClass}
                  status="pending"
                  key={keyGen()}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Arrangements;
