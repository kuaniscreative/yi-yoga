import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import { signOut } from '../actions/authActions';

class SideMenu extends Component {
  clearSuccessMessage = (target = '') => {
    const output = `CLEAR_SUCCESS_MESSAGE_${target}`;
    this.props.clearSuccessMessage(output);
  };

  handleClick = (target = '') => {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.classList.remove('active');

    if (target.length) {
      this.clearSuccessMessage(target);
    }
  };

  /**
   *      UI
   */
  userOptions = () => {
    return (
      <div>
        {this.props.uid ? (
          <div id="sideMenu_actions">
            <p className="sideMenu_division">課程管理</p>
            <Link
              to={this.props.newSession ? '/register-classes' : '/'}
              className=""
              onClick={() => {
                this.handleClick('REGISTER_CLASS');
              }}
            >
              <p className="rectButton_text">報名</p>
            </Link>
            <Link
              to="/leave-application"
              className=""
              onClick={() => {
                this.handleClick('LEAVE');
              }}
            >
              <p className="rectButton_text">請假</p>
            </Link>

            <Link
              to="/reschedule"
              className=""
              onClick={() => {
                this.handleClick('RESCHEDULE');
              }}
            >
              <p className="rectButton_text">補課</p>
            </Link>
          </div>
        ) : null}
        {this.props.uid ? (
          <div id="sideMenu_users">
            <p className="sideMenu_division">使用者</p>
            <Link
              to="/userStatus"
              className=""
              onClick={() => {
                this.handleClick();
              }}
            >
              <p className="rectButton_text">課程狀態</p>
            </Link>
            <Link
              to="/userAccount"
              className=""
              onClick={() => {
                this.handleClick();
              }}
            >
              <p className="rectButton_text">帳號管理</p>
            </Link>
          </div>
        ) : null}

        <div id="sideMenu_infos">
          <p className="sideMenu_division">課程資訊</p>
          <Link
            to="/locationInfo"
            className=""
            onClick={() => {
              this.handleClick();
            }}
          >
            <p className="rectButton_text">上課地點</p>
          </Link>
          <Link
            to="/leaveRule"
            className=""
            onClick={() => {
              this.handleClick();
            }}
          >
            <p className="rectButton_text">請假規則</p>
          </Link>
          <Link
            to="/rescheduleRule"
            className=""
            onClick={() => {
              this.handleClick();
            }}
          >
            <p className="rectButton_text">補課規則</p>
          </Link>
        </div>
      </div>
    );
  };

  adminOptions = () => {
    return (
      <div>
        <div id="sideMenu_actions">
          <p className="sideMenu_division">課程管理</p>
          <Link
            to="/admin/new-session"
            onClick={() => {
              this.handleClick('NEW_SESSION');
            }}
          >
            <p className="rectButton_text">開放報名</p>
          </Link>
          <Link
            to="/admin/classList"
            onClick={() => {
              this.handleClick();
            }}
          >
            <p className="rectButton_text">課表</p>
          </Link>
          <Link
            to="/admin/paymentStatus"
            onClick={() => {
              this.handleClick();
            }}
          >
            <p className="rectButton_text">付款狀況</p>
          </Link>
          <p className="sideMenu_division">學生管理</p>
          <Link
            to="/admin/newStudent"
            onClick={() => {
              this.handleClick();
            }}
          >
            <p className="rectButton_text">新學生</p>
          </Link>
          <p className="sideMenu_division">帳號管理</p>
          <button onClick={this.props.signOut}>
            <p className="rectButton_text">登出管理者</p>
          </button>
        </div>
      </div>
    );
  };

  render() {
    const userData = this.props.userData;
    const isAdmin = userData ? userData.isAdmin : false;

    return (
      <div id="sideMenu">
        {isAdmin ? this.adminOptions() : this.userOptions()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const uid = state.firebase.auth.uid;
  const userData = state.firestore.ordered.user
    ? state.firestore.ordered.user.find((user) => {
        return user.id === uid;
      })
    : null;
  return {
    uid: uid,
    userData: userData,
    newSession: state.firestore.ordered.newSession
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearSuccessMessage: (dispatchType) => {
      dispatch({ type: dispatchType });
    },
    signOut: () => {
      dispatch(signOut());
    }
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'user' }, { collection: 'newSession' }])
)(SideMenu);
