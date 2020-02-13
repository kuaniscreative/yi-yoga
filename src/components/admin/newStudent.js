import React, { Component } from 'react';

// components
import Container from '../ui/container';
import Row from '../ui/row';
import TitleBlock from '../ui/titleBlock';
import StudentCard from './studentCard';

class NewStudent extends Component {
  state = {};
  render() {
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
              <div className="col-12 col-md-6 col-lg-4">
                <StudentCard />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <StudentCard />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <StudentCard />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <StudentCard />
              </div>
            </div>
          </div>
        </Row>
      </Container>
    );
  }
}

export default NewStudent;
