import React, { useContext, Fragment } from 'react';
import styled from 'styled-components';

// components
import ArrangementSingle from './userStatus_arrangementSingle';

// contexts
import { userStatusContext } from '../contexts/userStatusContext';

// functions
import keyGen from '../../functions/keyGen';

// data
import theme from '../../json/theme.json';

const styles = {
  block: {
    marginBottom: 40,
  },
};

const Title = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 2rem;
`;

const { gray3 } = theme.colors;

const DefaultMessage = styled.p`
  font-weight: 500;
  color: ${gray3};
`;

const Default = () => {
  return (
    <div>
      <DefaultMessage>尚未報名任何課程</DefaultMessage>
    </div>
  );
};

const Arrangements = () => {
  const {
    rescheduledInfos,
    reschedulePending,
    reschedulableClasses,
    absenceClasses,
  } = useContext(userStatusContext);

  return (
    <div className="contianer-fluid px-0">
      <div className="row">
        {reschedulableClasses.length ? (
          <div style={styles.block} className="col-12">
            <Title className="col-12">可補課課程：</Title>
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
          </div>
        ) : null}
        {rescheduledInfos.length ? (
          <div style={styles.block} className="col-12">
            <Title className="col-12">已補課課程：</Title>
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
          </div>
        ) : null}
        {reschedulePending.length ? (
          <div style={styles.block} className="col-12">
            <Title className="col-12">候補中課程：</Title>
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
          </div>
        ) : null}
        {absenceClasses.length ? (
          <div style={styles.block} className="col-12">
            <Title className="col-12">請假課程：</Title>
            <div className="col-12">
              {absenceClasses.map((classInfo) => {
                return (
                  <ArrangementSingle leaveClass={classInfo} key={keyGen()} />
                );
              })}
            </div>
          </div>
        ) : null}
        {!rescheduledInfos.length &&
        !reschedulePending.length &&
        !reschedulableClasses &&
        !absenceClasses ? (
          <div className="col-12">
            <Default />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Arrangements;
