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

export const createCellData = (month, year) => {
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
        date: null
      });
    } else {
      cellData.push({
        empty: false,
        date: new Date(year, month, i - startDay + 1)
      });
    }
  }
  return cellData;
};
