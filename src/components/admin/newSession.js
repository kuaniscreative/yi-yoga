import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

// components
import Setter from './newSession_setter';
import NewSessionPreview from './newSession_preview';
import Success from './newSession_success';
import TitleBlock from '../ui/titleBlock';

// actions
import { registerSession } from '../../actions/adminActions';

// contexts
import { newSessionContext } from '../contexts/newSessionContext';

class NewSession extends Component {
  state = {
    period: [],
    classes: [],
    periodInputIsValid: true
  };

  static contextType = newSessionContext;

  clearSessionInfo = () => {
    this.setState({
      ...this.state,
      classes: [],
      period: []
    });
  };

  deleteClassWhenPreview = (id) => {
    const classes = this.state.classes.filter((classSingle) => {
      return classSingle.id !== id;
    });
    this.setState({
      ...this.state,
      classes: classes
    });
  };

  addSession = () => {
    const period = this.state.period;
    const name = `${period[0].year}年 ${period[0].month}月 - ${period[1].month}月`;
    const sessionInfo = {
      name: name,
      classInfos: this.state.classes,
      period: period
    };
    this.props.registerSession(sessionInfo);
  };

  render() {
    return (
      <div id="newSession">
        <TitleBlock title="開放報名">
          開放新一期的課程。設定完成後同學即可開始報名。
        </TitleBlock>
        {this.context.step === 'setter' ? <Setter /> : null}
        {this.context.step === 'preview' ? (
          <NewSessionPreview
            deleteClassWhenPreview={this.deleteClassWhenPreview}
            addSession={this.addSession}
            clearSessionInfo={this.clearSessionInfo}
          />
        ) : null}
        {this.context.step === 'success' ? <Success /> : null}
        {/* {this.props.newSessionIsAdded ? (
          <Success />
        ) : this.state.classes.length ? (
          <NewSessionPreview
            classes={this.state.classes}
            deleteClassWhenPreview={this.deleteClassWhenPreview}
            addSession={this.addSession}
            clearSessionInfo={this.clearSessionInfo}
          />
        ) : (
          <NewSessionForm
            setSessionPeriod={this.setSessionPeriod}
            validPeriod={this.state.periodInputIsValid}
          />
        )} */}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    regularCourse: state.firestore.ordered.regularCourse,
    newSessionIsAdded: state.admin.newSessionIsAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerSession: (sessionInfo) => {
      dispatch(registerSession(sessionInfo));
    }
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'regularCourse' }])
)(NewSession);
