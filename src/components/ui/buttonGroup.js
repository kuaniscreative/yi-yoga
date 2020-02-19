import React, { useState } from 'react';
import styled from 'styled-components';

// data
import theme from '../../json/theme.json';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid ${theme.colors.gray6};
  border-radius: 8px;
  overflow: hidden;
`;

const ButtonWrapper = styled.div`
  flex: 1 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid ${theme.colors.gray6};
  &:first-child {
    border: none;
  }
  background: ${(props) => (props.inView ? theme.colors.gray6 : 'none')};
  button {
    width: 100%;
    height: 100%;
    padding: 12px 0;
    text-align: center;
    color: ${(props) => (props.inView ? 'white' : theme.colors.gray6)};
  }
`;

const ButtonGroup = (props) => {
  const { children } = props;
  const [inView, setInView] = useState(0);

  const handleClick = (e) => {
    const targetIndex = e.target.parentNode.dataset.index;
    const index = parseInt(targetIndex, 10);
    setInView(index);
  };

  return (
    <Wrapper onClick={handleClick}>
      {children.map((child, i) => {
        return (
          <ButtonWrapper key={i} data-index={i} inView={i === inView}>
            {child}
          </ButtonWrapper>
        );
      })}
    </Wrapper>
  );
};

export default ButtonGroup;
