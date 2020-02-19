import React, { Component } from 'react';
import styled from 'styled-components';

// components
import TitleBlock from '../ui/titleBlock';
import Block from '../ui/block';
import ButtonGroup from '../ui/buttonGroup';

class ClassList extends Component {
  render() {
    return (
      <div>
        <TitleBlock title="查看課表" />
        <Block>
          <ButtonGroup>
            <button>第一行</button>
            <button>第一行自不一樣</button>
            <button>第一行</button>
          </ButtonGroup>
        </Block>
      </div>
    );
  }
}

export default ClassList;
