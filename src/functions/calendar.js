const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return 32 - new Date(year, month, 32).getDate();
};

const getAmountOfCells = (month, year) => {
  const date = new Date(year, month, 1);
  const startDay = date.getDay();
  const daysInMonth = getDaysInMonth(date);
  const modulo = daysInMonth % 7;
  const base = parseInt(daysInMonth / 7);
  if (startDay === 0 && modulo === 0) {
    return base * 7;
  } else if (startDay > 0 && modulo + startDay > 7) {
    return (base + 2) * 7;
  } else {
    return (base + 1) * 7;
  }
};

export const createCellData = ({ month, year }) => {
  if (!month || !year) {
    return [];
  }
  const date = new Date(year, month, 1);
  const amountOfCells = getAmountOfCells(month, year);
  const daysInMonth = getDaysInMonth(date);
  const startDay = date.getDay();
  const cellData = [];
  for (let i = 0; i < amountOfCells; i++) {
    if (i < startDay || i > daysInMonth + startDay) {
      // it means empty cell
      cellData.push({
        empty: true,
        date: null,
        classes: []
      });
    } else {
      cellData.push({
        empty: false,
        date: new Date(year, month, i - startDay + 1),
        classes: []
      });
    }
  }
  return cellData;
};

const mapClassesToCalendar = (calendar, classes) => {
  let searchIndex = 0;
  const pending = {};

  for (const classInfo of classes) {
    const year = classInfo.date.getFullYear();
    const month = classInfo.date.getMonth();
    const date = classInfo.date.getDate();
    const matchPattern = new Date(year, month, date).valueOf();

    if (pending[matchPattern]) {
      const index = pending[matchPattern];
      calendar[index].classes.push(classInfo);
      continue;
    }

    while (calendar.length > searchIndex) {
      if (calendar[searchIndex].date === null) {
        break;
      }

      const currentValue = calendar[searchIndex].date.valueOf();
      if (currentValue === matchPattern) {
        calendar[searchIndex].classes.push(classInfo);
        break;
      } else {
        pending[currentValue] = searchIndex;
        searchIndex += 1;
      }
    }
  }
};

export const createCalendarData = (span = [], classes) => {
  if (span.length === 0 || classes.length === 0) {
    return [];
  }

  const destructedSpan = span.map((spanTag) => {
    const [month, year] = spanTag.split('/');
    return {
      month: parseInt(month, 10) - 1,
      year: parseInt(year, 10)
    };
  });

  const calendarWithCellData = destructedSpan.map((span) => {
    return createCellData(span);
  });

  calendarWithCellData.forEach((calendar) => {
    mapClassesToCalendar(calendar, classes);
  });

  return calendarWithCellData;
};
