import React from 'react';
import styled from 'styled-components';

// components

// data
import theme from '../../json/theme.json';

const Wrapper = styled.li`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${theme.colors.gray1};
`;

const ItemWrapper = styled.label`
  display: flex;
  cursor: pointer;
`;

const Left = styled.div`
  flex: 1 0 50%;
`;
const Right = styled.div`
  flex: 1 0 50%;
  display: flex;
  justify-content: flex-end;
`;

const Item = styled.div`
  font-weight: 500;
  letter-spacing: normal;
`;

const AvailableCheckMark = () => {
  return (
    <div className="checkboxContainer">
      <input type="checkbox" id="check" />
      <div className="checkmark"></div>
    </div>
  );
};

const ModalItem = (props) => {
  const { classInfo } = props;
  return (
    <div className="container-fluid px-0">
      <Wrapper className="row">
        <ItemWrapper htmlFor="check" className="col-12">
          <Left>
            <Item>{classInfo.type}</Item>
          </Left>
          <Right>
            <AvailableCheckMark />
          </Right>
        </ItemWrapper>
      </Wrapper>
    </div>
  );
};

export default ModalItem;
