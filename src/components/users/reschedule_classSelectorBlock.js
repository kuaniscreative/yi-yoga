import React, { useContext } from 'react';
import styled from 'styled-components';

// components
import Block from '../ui/block';
import LeaveClassList from './reschedule_LeaveClassList';
import AvailableClassList from './reschedule_availableClassList';

// contexts
import { rescheduleContext } from '../contexts/rescheduleContext';

const ClassSelectorBlock = () => {
  const { step } = useContext(rescheduleContext);

  return (
    <Block>
      {step === 'selectLeaveClass' ? <LeaveClassList /> : null}
      {step === 'selectRescheduleClass' ? <AvailableClassList /> : null}
    </Block>
  );
};

export default ClassSelectorBlock;
