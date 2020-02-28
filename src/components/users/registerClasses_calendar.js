import React, { Component } from 'react';
import styled, { css } from 'styled-components';

// components
import CalendarCellWithClassInfo from './registerClasses_calendarCellWithClassInfo';

// functions
import keyGen from '../../functions/keyGen';

// data
import theme from '../../json/theme.json';

const CalendarBase = styled.div`
  width: 100%;
  max-width: 424px;
`;
const CellWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  flex-wrap: wrap;
`;
const WeekDay = styled(CellWrapper)`
  border-bottom: 1px solid ${theme.colors.gray1};
`;

const Cell = styled.div`
  flex: 1 0 ${`${100 / 7}%`};
  display: flex;
  justify-content: center;
  align-items: ccenter;
`;

const CellContentStyle = css`
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  margin: 12px 4px;
  user-select: none;
  font-weight: 500;
  letter-spacing: normal;
  color: ${theme.colors.black};
`;

const CellContent = styled.div`
  ${CellContentStyle};
`;

const ClickableCell = styled.button`
  ${CellContentStyle};
  color: ${({ hasSelectedClass }) =>
    hasSelectedClass ? 'white' : theme.colors.black};
  background: ${({ hasSelectedClass }) =>
    hasSelectedClass ? theme.colors.green : 'white'};
`;

const WeekDayContent = styled(CellContent)`
  color: ${theme.colors.gray5};
`;

const NoClassContent = styled(CellContent)`
  color: ${theme.colors.gray3};
`;

const hasSelectedClass = (classes = []) => {
  for (let classInfo of classes) {
    if (classInfo.selected) {
      return true;
    }
  }
  return false;
};

const Calendar = (props) => {
  const { data, setModalInView, setModalSearchPattern, calendarIndex } = props;
  const days = ['日', '一', '二', '三', '四', '五', '六'];
  const handleClick = (index) => {
    setModalSearchPattern({
      calendar: calendarIndex,
      dateIndex: index
    });
    setModalInView(true);
  };

  return (
    <CalendarBase>
      <WeekDay>
        {days.map((day) => {
          return (
            <Cell key={keyGen()}>
              <WeekDayContent>{day}</WeekDayContent>
            </Cell>
          );
        })}
      </WeekDay>
      <CellWrapper>
        {data.length &&
          data.map((cellInfo, i) => {
            return cellInfo.empty ? (
              <Cell key={keyGen()}></Cell>
            ) : cellInfo.classes.length ? (
              <Cell key={keyGen()}>
                <ClickableCell
                  hasSelectedClass={hasSelectedClass(cellInfo.classes)}
                  onClick={() => {
                    handleClick(i);
                  }}
                >
                  {cellInfo.date.getDate()}
                </ClickableCell>
              </Cell>
            ) : (
              <Cell key={keyGen()}>
                <NoClassContent>{cellInfo.date.getDate()}</NoClassContent>
              </Cell>
            );
          })}
      </CellWrapper>
    </CalendarBase>
  );
};

// class Calendar extends Component {
//     paintCalendar = calendarInfo => {
//         const className = `calendar ${this.props.className}`;
//         return (
//             <div className={className}>
//                 <div className="weekDay calendarCellWrapper">
//                     <div className="calendarCell">
//                         <span>日</span>
//                     </div>
//                     <div className="calendarCell">
//                         <span>一</span>
//                     </div>
//                     <div className="calendarCell">
//                         <span>二</span>
//                     </div>
//                     <div className="calendarCell">
//                         <span>三</span>
//                     </div>
//                     <div className="calendarCell">
//                         <span>四</span>
//                     </div>
//                     <div className="calendarCell">
//                         <span>五</span>
//                     </div>
//                     <div className="calendarCell">
//                         <span>六</span>
//                     </div>
//                 </div>
//                 <div className="calenderDay calendarCellWrapper">
//                     {calendarInfo.map((data, i) => {
//                         if (!data.date) {
//                             return (
//                                 <div className="calendarCell" key={i}>
//                                     <span></span>
//                                 </div>
//                             );
//                         } else if (!data.hasClass) {
//                             let split = data.date.split("/").map(str => {
//                                 return parseInt(str);
//                             });
//                             const date = new Date(
//                                 split[0],
//                                 split[1] - 1,
//                                 split[2]
//                             ).getDate();
//                             return (
//                                 <div className="calendarCell inactive" key={i}>
//                                     <span>{date}</span>
//                                 </div>
//                             );
//                         } else {
//                             let split = data.date.split("/").map(str => {
//                                 return parseInt(str);
//                             });
//                             const date = new Date(
//                                 split[0],
//                                 split[1] - 1,
//                                 split[2]
//                             ).getDate();
//                             const hasClassHasSelected = data.hasClass.filter(
//                                 info => {
//                                     return info.selected;
//                                 }
//                             );
//                             const selected = hasClassHasSelected.length
//                                 ? true
//                                 : false;
//                             return (
//                                 <CalendarCellWithClassInfo
//                                     data={data}
//                                     date={date}
//                                     index={i}
//                                     selected={selected}
//                                     key={i}
//                                     monthKey={this.props.monthKey}
//                                 />
//                             );
//                         }
//                     })}
//                 </div>
//             </div>
//         );
//     };

//     render() {
//         const calendarInfo = this.props.calendarInfo;
//         return (
//             <div>{calendarInfo ? this.paintCalendar(calendarInfo) : null}</div>
//         );
//     }
// }

export default Calendar;
