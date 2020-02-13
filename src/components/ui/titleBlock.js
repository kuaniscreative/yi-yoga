import React from 'react';

const TitleBlock = (props) => {
  const { title } = props;
  return (
    <div className="col-12 col-md-10 col-lg-8 container">
      <h2>{title}</h2>
    </div>
  );
};

export default TitleBlock;
