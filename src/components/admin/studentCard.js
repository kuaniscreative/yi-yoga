import React from 'react';

import studentExample from '../../json/studentExample';

const StudentCard = () => {
  const { name, nickName, email, message } = studentExample;
  return (
    <div className="studentCard">
      <div className="studentCard_info">
        <h1 className="studentCard_name">
          <span className="name">{name}</span>
          <span className="nickName">{nickName}</span>
        </h1>
        <p className="studentCard_email">{email}</p>
      </div>
      <div className="studentCard_message">
        <p>{message}</p>
      </div>
      <div className="studentCard_action">
        <button className="outlineButton">開放使用</button>
      </div>
    </div>
  );
};

export default StudentCard;
