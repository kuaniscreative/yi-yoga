import React, { Component } from 'react';

// components
import Container from '../ui/container';
import Row from '../ui/row';
import TitleBlock from '../ui/titleBlock';
import NewStudentList from './newStudentList';

// contexts
import { allUserContext } from '../contexts/allUserContext';

const DefaultOutput = () => {
  return <div className="col-12 col-md-10">沒有新學生</div>;
};

class NewStudent extends Component {
  state = {};
  static contextType = allUserContext;

  render() {
    const { students } = this.context;
    const newStudents = students.filter((student) => {
      return student.validated === false;
    });

    return (
      <Container>
        <Row>
          <TitleBlock title="新學生">
            以下是新註冊的學生，需要管理者確認過後才可以使用系統報名課程
          </TitleBlock>
        </Row>
        <Row>
          {newStudents.length ? (
            <NewStudentList newStudents={newStudents} />
          ) : (
            <DefaultOutput />
          )}
        </Row>
      </Container>
    );
  }
}

export default NewStudent;
