import React from 'react';

const Row = (props) => {
  const { extraClass, children } = props;
  return (
    <section
      className={`row justify-content-center layout_section ${extraClass}`}
    >
      {children}
    </section>
  );
};

export default Row;
