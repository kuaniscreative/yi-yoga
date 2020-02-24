import React from 'react';
import styled from 'styled-components';

// components
import { ReactComponent as Arrow } from '../../static/arrow.svg';

// data
import theme from '../../json/theme.json';

const Hint = styled.div`
  padding-bottom: 1em;
  font-weight: 500;
  font-size: 0.75rem;
  color: ${theme.colors.gray3};
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${theme.colors.black};
`;

const ArrowIcon = styled(Arrow)`
  margin-left: 0.5rem;
`;

const NextStepButton = (props) => {
  const { hint, action, handler } = props;
  return (
    <div>
      <Hint>{hint}</Hint>
      <ActionButton onClick={handler}>
        {action}
        <ArrowIcon width="24" height="24" />
      </ActionButton>
    </div>
  );
};

export default NextStepButton;
