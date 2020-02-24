import React, { createContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';

export const loadingContext = createContext();

const move = keyframes`
    from {
        left: -100vw;
    }
    to {
        left: 100vw;
    }
`;

const LoadingBarWrapper = styled.div`
  display: ${(props) => (props.active ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  overflow: hidden;
  z-index: 20;
`;

const Bar = styled.div`
  display: block;
  width: 92%;
  height: 100%;
  position: absolute;
  opacity: 0.8;
  background-image: linear-gradient(
    45deg,
    transparent 0%,
    #fad0c4 2%,
    #e15554 50%,
    #fad0c4 98%,
    transparent 100%
  );
  animation: ${move} 1.2s linear infinite;
`;

const LoadingContextProvider = (props) => {
  const [loadingBarActive, setLoadingBarActive] = useState(false);

  return (
    <loadingContext.Provider value={{ loadingBarActive, setLoadingBarActive }}>
      <LoadingBarWrapper active={loadingBarActive}>
        <Bar />
      </LoadingBarWrapper>
      {props.children}
    </loadingContext.Provider>
  );
};

export default LoadingContextProvider;
