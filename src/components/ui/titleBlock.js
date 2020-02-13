import React from 'react';

const TitleBlock = (props) => {
  const { title, children } = props;
  return (
    <div className="col-12 col-md-10 container titleBlock">
      <h1>{title}</h1>
      <p>{children}</p>
      <div className="titleBlock_line"></div>
    </div>
  );
};

export default TitleBlock;
