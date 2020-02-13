import React from 'react';

// data
import studentExample from '../../json/studentExample';

//actions
import { validateStudent } from '../../actions/adminActions';

const StudentCard = (props) => {
  const { name, nickName, email, message, id } = studentExample;
  const handleClick = (e) => {
    const id = e.target.dataset.id;
    if (id) {
      validateStudent(id);
    }
  };
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
        <button className="outlineButton" data-id={id} onClick={handleClick}>
          開放使用
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
