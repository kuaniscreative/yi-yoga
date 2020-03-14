import React, { useContext } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

// components
import ClassListItem from './leaveApplication_classListItem';
import NextStepButtonsArea from '../ui/nextStepButtonArea';
import StepIndicator from '../stepIndicator';

// contexts
import { userStatusContext } from '../contexts/userStatusContext';

// functions
import keyGen from '../../functions/keyGen';

const ClassList = () => {
  const { userClasses } = useContext(userStatusContext);

  return (
    <div className="container-fluid px-0">
      <div className="row">
        <ul className="col-12 col-md-6">
          {userClasses.map((classInfo) => {
            return <ClassListItem date={classInfo.date} key={keyGen()} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default ClassList;

// class ClassList extends Component {
//     state = {
//         selected: {}
//     };

//     submit = () => {
//         if (Object.keys(this.state.selected).length) {
//             this.props.submit(this.state.selected);
//         }
//     };

//     select = date => {
//         this.setState({
//             selected: date
//         });
//     };

//     render() {
//         return (
//             <div className="layout_contentBlock nextStepButtonsArea_parent">
//                 <StepIndicator indicator="選擇請假日期" />
//                 <div id="leaveApplication_classList">
//                     <ul className="borderBottomList">
//                         {this.props.classes &&
//                             this.props.classes.map((classInfo, i) => {
//                                 return (
//                                     <li key={i}>
//                                         <DateSingle
//                                             classSingle={classInfo.date}
//                                             select={this.select}
//                                             canApply={classInfo.canApply}
//                                             id={classInfo.id}
//                                         />
//                                     </li>
//                                 );
//                             })}
//                     </ul>
//                 </div>

//                 <NextStepButtonsArea
//                     action={this.submit}
//                     cancel={() => {
//                         this.props.history.push("/");
//                     }}
//                 />
//             </div>
//         );
//     }
// }

// export default withRouter(ClassList);
