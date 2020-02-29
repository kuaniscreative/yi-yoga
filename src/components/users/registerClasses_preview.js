import React, { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

// components
import DeleteIcon from '../ui/deleteIcon';
import List, { ListTitle, ListItem } from '../ui/bottomLineList';
import ProcessNav, {
  ItemWrapper,
  ItemWrapperRight,
  Hint,
  ActionButton
} from '../ui/processNav';

// contexts
import { registerClassContext } from '../contexts/registerClassContext';
import { userContext } from '../contexts/userContext';
import { openingSessionContext } from '../contexts/openingSessionContext';
import { loadingContext } from '../contexts/loadingContext';

// functions
import keyGen from '../../functions/keyGen';

// actions
import { registerToCourse } from '../../actions/registerToCourse';

// data
import theme from '../../json/theme.json';

const Instruction = styled.div`
  margin-bottom: 4rem;
  font-weight: 500;
`;

const ListContextStyle = css`
  display: flex;
  align-items: center;
`;

const ListContent = styled.div`
  ${ListContextStyle};
  flex: 1 0 75%;
  font-weight: 500;
`;
const ListAction = styled.div`
  ${ListContextStyle};
  flex: 1 0 25%;
  justify-content: flex-end;
`;

const ClassDate = styled.span`
  display: inline-block;
  letter-spacing: normal;
  margin-right: 16px;
`;

const ClassType = styled.span`
  display: inline-block;
  letter-spacing: normal;
  font-size: 0.75rem;
`;

const Price = styled(ListTitle)`
  margin-top: 1rem;
`;

const Nav = styled.div`
  margin: 5rem 0 3rem 0;
`;

function mapClassesToSelections(selections = [], classes = []) {
  if (selections.length === 0 || classes.length === 0) {
    return [];
  }

  return selections.map((selection) => {
    return classes.find((classInfo) => {
      return classInfo.id === selection;
    });
  });
}

function getAmount(num) {
  if (num >= 8) {
    return num * 250;
  } else if (num >= 4) {
    return num * 300;
  } else {
    return num * 350;
  }
}

const Preview = () => {
  /**
   * get selected classes data
   */
  const userData = useContext(userContext);
  const { session } = useContext(openingSessionContext);
  const {
    classes,
    selectedClasses,
    setSelectedClasses,
    toNextStep,
    toPrevStep
  } = useContext(registerClassContext);
  const [selections, setSelections] = useState([]);
  useEffect(() => {
    if (selectedClasses.length !== 0 && classes.length !== 0) {
      const selections = mapClassesToSelections(selectedClasses, classes);
      setSelections(selections);
    }
  }, [classes, selectedClasses]);

  /**
   * function for remove classes
   */
  const removeClass = (selection) => {
    const newSelection = selectedClasses.filter((selected) => {
      return selected !== selection;
    });
    setSelectedClasses(newSelection);
  };

  /**
   *  function for sign up courses
   */
  const { setLoadingBarActive } = useContext(loadingContext);
  const amount = getAmount(selectedClasses.length);
  const signUpToCourse = () => {
    setLoadingBarActive(true);
    registerToCourse(
      selectedClasses,
      userData,
      session.name,
      session.id,
      amount
    ).then(() => {
      setLoadingBarActive(false);
      toNextStep();
    });
  };

  return (
    <div>
      <Instruction>請確認所選課堂及費用</Instruction>
      <List>
        {selections.map((selection) => {
          return (
            <ListItem key={keyGen()}>
              <ListContent>
                <div>
                  <ClassDate>{selection.name}</ClassDate>
                  <ClassType>{selection.type}</ClassType>
                </div>
              </ListContent>
              <ListAction>
                <button
                  onClick={() => {
                    removeClass(selection.id);
                  }}
                >
                  <DeleteIcon />
                </button>
              </ListAction>
            </ListItem>
          );
        })}
        <Price>{`共選取 ${selectedClasses.length} 堂課，學費為 ${amount} 元`}</Price>
      </List>
      <Nav>
        <ProcessNav>
          <ItemWrapper>
            <Hint>上一步</Hint>
            <ActionButton onClick={toPrevStep}>選取課堂</ActionButton>
          </ItemWrapper>
          <ItemWrapperRight>
            <Hint>下一步</Hint>
            <ActionButton onClick={signUpToCourse}>報名</ActionButton>
          </ItemWrapperRight>
        </ProcessNav>
      </Nav>
    </div>
  );
};

export default Preview;
