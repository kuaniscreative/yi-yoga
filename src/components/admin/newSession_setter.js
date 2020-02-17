import React, { useState, useContext } from 'react';

// components
import Block from '../ui/block';
import Subtitle from '../ui/subtitle';

// contexts
import { newSessionContext } from '../contexts/newSessionContext';

const MonthSelect = (props) => {
  const { point, changeHandler } = props;
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <select
      required
      type="number"
      name="month"
      data-point={point}
      onChange={changeHandler}
    >
      <option value="">mm</option>
      {options.map((option) => {
        return (
          <option value={option} key={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
};

const YearSelect = (props) => {
  const { point, changeHandler } = props;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const options = [];
  for (let i = 0; i < 3; i++) {
    options.push(currentYear + i);
  }
  return (
    <select
      required
      type="number"
      name="year"
      data-point={point}
      onChange={changeHandler}
    >
      <option value="">yyyy</option>
      {options.map((option) => {
        return (
          <option value={option} key={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
};

const initSpan = {
  start: {
    month: null,
    year: null
  },
  end: {
    month: null,
    year: null
  }
};

const Setter = () => {
  const [span, setSpan] = useState(initSpan);
  const { toNextStep, setSessionSpan } = useContext(newSessionContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // check if the input date is valid
    const sMonth = span.start.month;
    const eMonth = span.end.month;
    const sYear = span.start.year;
    const eYear = span.end.year;
    const validYear = eYear >= sYear;
    const validPeriod = validYear && eMonth >= sMonth;

    if (validPeriod) {
      setSessionSpan(span);
      toNextStep();
    } else {
      alert('時間設定有誤');
    }
  };

  const handleChange = (e) => {
    // start or end
    const point = e.target.dataset.point;
    // year or month
    const name = e.target.name;
    const value = e.target.value;
    setSpan({
      ...span,
      [point]: {
        ...span[point],
        [name]: parseInt(value, 10)
      }
    });
  };

  return (
    <Block>
      <Subtitle title="設定課程期間" />
      <form action="" onSubmit={handleSubmit} className="comfyForm">
        <label htmlFor="start">開始月份</label>
        <div className="periodSetter">
          <YearSelect point="start" changeHandler={handleChange} />
          <div className="seperator">/</div>
          <MonthSelect point="start" changeHandler={handleChange} />
        </div>
        <label htmlFor="end">結束月份</label>
        <div className="periodSetter">
          <YearSelect point="end" changeHandler={handleChange} />
          <div className="seperator">/</div>
          <MonthSelect point="end" changeHandler={handleChange} />
        </div>
        <button className="outlineButton">確認</button>
      </form>
    </Block>
  );
};

export default Setter;
