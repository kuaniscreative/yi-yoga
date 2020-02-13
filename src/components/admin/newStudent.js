import React, { Component } from 'react';

// components
import Container from '../ui/container';
import Row from '../ui/row';
import TitleBlock from '../ui/titleBlock';

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
      </Container>
    );
  }
}

export default NewStudent;
