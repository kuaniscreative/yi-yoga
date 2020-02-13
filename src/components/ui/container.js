import React from 'react';

const Container = (props) => {
  const { id, children } = props;
  return (
    <div className="container" id={id}>
      {children}
    </div>
  );
};

export default Container;
