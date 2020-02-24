import React, { useContext } from 'react';

// components
import { OptionButton } from './classList_optionButton';

// contexts
import { classListContext } from '../contexts/classListContext';

// functions
import keyGen from '../../functions/keyGen';
import { toChineseString } from '../../functions/toChineseString';

const MonthOptions = () => {
  const { monthOptions, monthIndex, setMonthIndex } = useContext(
    classListContext
  );
  const selectMonth = (e) => {
    const index = e.target.dataset.index;
    const i = parseInt(index, 10);
    setMonthIndex(i);
  };

  return (
    <div>
      {monthOptions.map((item, i) => {
        const inView = i === monthIndex;
        return (
          <OptionButton
            key={keyGen()}
            inView={inView}
            data-index={i}
            onClick={selectMonth}
          >
            {`${toChineseString(item + 1)}月`}
          </OptionButton>
        );
      })}
    </div>
  );
};

export default MonthOptions;
