import React, { useContext } from 'react';
import styled from 'styled-components';

// contexts
import { registerClassContext } from '../contexts/registerClassContext';

// functions
import keyGen from '../../functions/keyGen';

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
  pointer-events: ${({ status }) => (status !== 'available' ? 'none' : 'auto')};
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
  color: ${({ status }) =>
    status !== 'available' ? theme.colors.gray3 : 'black'};
`;

const DisableText = styled.div`
  color: ${theme.colors.gray3};
  user-select: none;
`;

const AvailableCheckMark = (props) => {
  const { inputAnchor, selected } = props;
  return (
    <div className="checkboxContainer">
      <input type="checkbox" id={inputAnchor} defaultChecked={selected} />
      <div className="checkmark"></div>
    </div>
  );
};

const DisableMark = (props) => {
  const { status } = props;
  const output = status === 'full' ? '已額滿' : '已報名';
  return <DisableText>{output}</DisableText>;
};

const ModalItem = (props) => {
  const { classInfo } = props;
  const status =
    classInfo && classInfo.isFull
      ? 'full'
      : classInfo.userRegistered
      ? 'registered'
      : 'available';
  const inputAnchor = keyGen();
  const selected = classInfo.selected;
  const { selectedClasses, setSelectedClasses } = useContext(
    registerClassContext
  );

  const handleclick = () => {
    const classId = classInfo.id;
    if (selectedClasses.indexOf(classId) > -1) {
      const newSelection = selectedClasses.filter((id) => {
        return id !== classId;
      });
      setSelectedClasses(newSelection);
    } else {
      const newSelection = [...selectedClasses, classId];
      setSelectedClasses(newSelection);
    }
  };

  return (
    <div className="container-fluid px-0">
      <Wrapper className="row">
        <ItemWrapper
          htmlFor={inputAnchor}
          className="col-12"
          status={status}
          onClick={handleclick}
        >
          <Left>
            <Item status={status}>{classInfo.type}</Item>
          </Left>
          <Right>
            {status === 'available' ? (
              <AvailableCheckMark
                inputAnchor={inputAnchor}
                selected={selected}
              />
            ) : (
              <DisableMark status={status} />
            )}
          </Right>
        </ItemWrapper>
      </Wrapper>
    </div>
  );
};

export default ModalItem;
