import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// components
import StepIndicator from '../stepIndicator';
import NextStepButtonsArea from '../ui/nextStepButtonArea';
import ItemBarWithAction from '../ui/itemBarWithAction';

// actions
import { registerToCourse } from '../../actions/userActions';

const Instruction = styled.div`
  margin-bottom: 4rem;
  font-weight: 500;
`;

const Preview = () => {
  return (
    <div>
      <Instruction>請確認所選課堂及費用</Instruction>
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
