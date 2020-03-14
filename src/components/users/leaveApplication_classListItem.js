import React, { Component } from 'react';
import styled from 'styled-components';

// components
import ItemBarWithAction from '../ui/itemBarWithAction';
import DateSingle from '../ui/dateSingle';

// data
import theme from '../../json/theme.json';

const ListItem = styled.li`
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${theme.colors.gray1};
`;

const ListWrapper = styled.label`
  display: flex;
  width: 100%;
  align-items: center;
`;

const CheckmarkWrapper = styled.div`
  flex: 0 0 56px;
`;

const Checkmark = () => {
  return (
    <div className="checkboxContainer">
      <input type="radio" name="leaveDate" />
      <div className="checkmark"></div>
    </div>
  );
};

const ClassListItem = ({ date }) => {
  return (
    <ListItem>
      <ListWrapper>
        <CheckmarkWrapper>
          <Checkmark />
        </CheckmarkWrapper>
        <DateSingle date={date} />
      </ListWrapper>
    </ListItem>
  );
};

// class DateSingle extends Component {
//     state = {
//         selected: false
//     };

//     handleSelect = () => {
//         if (this.props.canApply) {
//             this.props.select({
//                 date: this.props.classSingle,
//                 id: this.props.id
//             });
//         }
//     };

//     conditionalCheckmark = () => {
//         return this.props.canApply ? (
//             <div className="checkboxContainer_checkbox">
//                 <input
//                     type="radio"
//                     name="leaveDate"
//                     onChange={this.handleSelect}
//                 />
//                 <span className="checkmark"></span>
//             </div>
//         ) : (
//             <div className="checkboxContainer_checkbox">不可請假</div>
//         );
//     };

//     render() {
//         const date = this.props.classSingle.toDate();
//         const disableSelect = this.props.canApply ? "" : "disableSelect";

//         return (
//             <label
//                 className={`checkboxContainer ${disableSelect}`}
//                 onClick={this.handleClick}
//             >
//                 <ItemBarWithAction
//                     message={
//                         <DateSingle_UI date={date} />
//                     }
//                     action={this.conditionalCheckmark()}
//                 />
//             </label>
//         );
//     }
// }

export default ClassListItem;
