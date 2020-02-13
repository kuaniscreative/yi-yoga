import React from 'react';

const Row = (props) => {
  const { extraClass, children } = props;
  return (
    <section className={`row justify-content-center ${extraClass}`}>
      {children}
    </section>
  );
};

export default Row;
