import React, { Component } from 'react';

// components
import Container from '../ui/container';
import Row from '../ui/row';
import TitleBlock from '../ui/titleBlock';
import StudentCard from './studentCard';

// contexts
import { allUserContext } from '../contexts/allUserContext';

// functions
import keyGen from '../../functions/keyGen';

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
          <div className="col-10 container-fluid">
            <div className="row">
              {newStudents.map((student) => {
                return (
                  <div className="col-12 col-md-6 col-lg-4" key={keyGen()}>
                    <StudentCard data={student} />
                  </div>
                );
              })}
            </div>
          </div>
        </Row>
      </Container>
    );
  }
}

export default NewStudent;
