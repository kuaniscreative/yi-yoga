export function reconstruct(classes) {
  const monthOptions = [];
  const sortedByMonth = {};

  if (classes.length === 0) {
    return {
      monthOptions,
      sortedByMonth
    };
  }

  classes.forEach((classInfo) => {
    const date = classInfo.date;
    const classMonth = date.getMonth();
    if (monthOptions.indexOf(classMonth) < 0) {
      monthOptions.push(classMonth);
      sortedByMonth[classMonth] = [];
    }
    sortedByMonth[classMonth].push(classInfo);
  });

  return {
    monthOptions: monthOptions.sort((a, b) => {
      return a - b;
    }),
    sortedByMonth
  };
}

export function getCourseOption(regularCourse) {
  return regularCourse.reduce((acc, cVal) => {
    const day = cVal.day;
    if (acc.indexOf(day) < 0) {
      return [...acc, day];
    }
    return acc;
  }, []);
}

export function rule(classInfo) {
  const pattern = this;
  return Object.keys(pattern).every((key) => {
    if (pattern[key] === null || undefined) {
      return true;
    }
    return pattern[key] === classInfo[key];
  });
}
