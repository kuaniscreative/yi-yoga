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
          <TitleBlock title="新學生" />
        </Row>
      </Container>
    );
  }
}

export default NewStudent;
