import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// actions
import { signOut } from '../../actions/authActions';

// functions
import keyGen from '../../functions/keyGen';

class SideMenu extends Component {
  handleClick = () => {
    const sideMenu = document.getElementById('sideMenuRefactor');
    sideMenu.classList.remove('active');
  };

  render() {
    const { divisions } = this.props.data;
    return (
      <div id="sideMenuRefactor">
        <div className="container-fluid">
          <div className="row">
            <button>
              <span className="closeIcon"></span>
            </button>
          </div>
        </div>
        {divisions.map((division) => {
          return (
            <div key={keyGen()}>
              <p className="sideMenu_division">{division.name}</p>
              {division.items.map((item) => {
                return (
                  <Link
                    to={item.path}
                    onClick={this.handleClick}
                    key={keyGen()}
                  >
                    <p className="rectButton_text">{item.name}</p>
                  </Link>
                );
              })}
            </div>
          );
        })}
        <p className="sideMenu_division">帳號管理</p>
        <button onClick={this.props.signOut}>
          <p className="rectButton_text">登出</p>
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => {
      dispatch(signOut());
    }
  };
};

export default connect(null, mapDispatchToProps)(SideMenu);
