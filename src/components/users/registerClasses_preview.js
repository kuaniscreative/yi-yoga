import React, { Component, useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

// components
import StepIndicator from '../stepIndicator';
import NextStepButtonsArea from '../ui/nextStepButtonArea';
import ItemBarWithAction from '../ui/itemBarWithAction';
import DeleteIcon from '../ui/deleteIcon';
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

// functions
import keyGen from '../../functions/keyGen';

// actions
import { registerToCourse } from '../../actions/registerToCourse';

// data
import theme from '../../json/theme.json';

const { black, gray3, gray1 } = theme.colors;

const Instruction = styled.div`
  margin-bottom: 4rem;
  font-weight: 500;
`;

const List = styled.ul`
  padding: 24px 16px;
  border-radius: 16px;
  box-shadow: 0 0 16px -8px ${gray3};
`;

const ListTitle = styled.div`
  font-weight: 500;
  padding: 16px 0;
`;

const ListItem = styled.li`
  display: flex;
  padding: 16px;
  border-bottom: 1px solid ${gray1};
  @media (max-width: 576px) {
    padding: 16px 8px;
  }
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

  const removeClass = (selection) => {
    const newSelection = selectedClasses.filter((selected) => {
      return selected !== selection;
    });
    setSelectedClasses(newSelection);
  };

  const amount = getAmount(selectedClasses.length);

  const signUpToCourse = () => {
    registerToCourse(
      selectedClasses,
      userData,
      session.name,
      session.id,
      amount
    ).then(() => {
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

// class Preview extends Component {
//   componentDidMount() {
//     window.scrollTo(0, 0);
//   }

//   returnPrice = (num) => {
//     if (num >= 8) {
//       return num * 250;
//     } else if (num >= 4) {
//       return num * 300;
//     } else {
//       return num * 350;
//     }
//   };

//   registerToCourse = () => {
//     const classes = this.props.selection.map((info) => {
//       return {
//         date: info.date,
//         id: info.id
//       };
//     });
//     const userId = this.props.userId;
//     const amount = this.returnPrice(classes.length);
//     const sessionName = this.props.session.name;
//     const sessionId = this.props.session.id;

//     if (!classes.length) {
//       alert('未選取任何課程');
//     } else {
//       this.props.registerToCourse(
//         classes,
//         this.props.userData,
//         sessionName,
//         sessionId,
//         amount
//       );
//     }
//   };

//   dateOutput = (date) => {
//     const yyyy = date.getFullYear();
//     const mm = date.getMonth() + 1;
//     const dd = date.getDate();
//     const hr = date.getHours();
//     const min = date.getMinutes();
//     const day = date.getDay();
//     const dayOutput = day.toLocaleString('zh-u-nu-hanidec');
//     return (
//       <div className="registerClass_preview_date">
//         <span>{`${yyyy}年${mm}月${dd}日`}</span>
//         <span>{`週${dayOutput} ${hr}:${min}`}</span>
//       </div>
//     );
//   };

//   render() {
//     const num = this.props.selection.length;
//     const cost = this.returnPrice(num);

//     return (
//       <div id="registerClass_preview">
//         <div id="selectClassPanel_instruction" className="layout_contentBlock">
//           <StepIndicator indicator="step2. 確認表單" />
//           <ul className="comfyList">
//             <li>請確認所選課堂及費用</li>
//             <li>如果正確，請點擊報名</li>
//           </ul>
//         </div>
//         <div id="registerClass_previewOptions">
//           <ul className="borderBottomList">
//             <div className="borderBottomList_title">已選取課堂</div>
//             {this.props.selection.map((info, i) => {
//               return (
//                 <li key={i}>
//                   <ItemBarWithAction
//                     message={this.dateOutput(info.date)}
//                     action={
//                       <button
//                         className="cancelIcon"
//                         onClick={() => {
//                           this.props.removeClass(info);
//                         }}
//                       ></button>
//                     }
//                   />
//                 </li>
//               );
//             })}
//             <div id="registerClass_previewSummary">{`共選取${num}堂課，學費為${cost}元`}</div>
//           </ul>
//         </div>

//         <NextStepButtonsArea
//           action={this.registerToCourse}
//           actionName="報名"
//           cancel={this.props.cancelPreview}
//           cancelName="上一步"
//         />
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     userId: state.firebase.auth.uid
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     removeClass: (info) => {
//       dispatch({ type: 'REMOVE_CLASS_WHEN_REGISTER_CLASS', info });
//     },
//     registerToCourse: (classes, userData, sessionName, sessionId, amount) => {
//       dispatch(
//         registerToCourse(classes, userData, sessionName, sessionId, amount)
//       );
//     }
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Preview);
