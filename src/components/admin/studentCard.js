import React from 'react';

//actions
import { validateStudent } from '../../actions/adminActions';

const StudentCard = (props) => {
  const { name, nickName, email, message, id } = props.data;
  const handleClick = (e) => {
    const id = e.target.dataset.id;
    const proceed = window.confirm(`確認開放 ${name} 所有功能`);
    if (proceed) {
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
