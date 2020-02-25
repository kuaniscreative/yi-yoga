import React, { createContext, useState } from 'react';

export const navContext = createContext();

const NavContextProvider = (props) => {
  const [navIsActive, setNavIsActive] = useState(true);
  const [headerBackground, setHeaderBackground] = useState('white');
  return (
    <navContext.Provider
      value={{
        navIsActive,
        setNavIsActive,
        headerBackground,
        setHeaderBackground
      }}
    >
      {props.children}
    </navContext.Provider>
  );
};

export default NavContextProvider;
