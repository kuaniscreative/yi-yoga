import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

// actions
import { signOut } from '../../actions/authActions';

// functions
import keyGen from '../../functions/keyGen';

class SideMenu extends Component {
  handleClick = () => {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.classList.remove('active');
  };

  render() {
    const { divisions } = this.props.data;

    return (
      <div id="sideMenu">
        {/* {isAdmin ? this.adminOptions() : this.userOptions()} */}
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
