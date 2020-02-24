import keyGen from './keyGen';

export const createClassProfile = (startDate, endDate, regularCourses) => {
  const classes = [];

  while (startDate.valueOf() !== endDate.valueOf()) {
    const day = startDate.getDay();
    const match = regularCourses.filter((course) => {
      return course.dayNum === day;
    });

    if (match.length) {
      match.forEach((course) => {
        const yyyy = startDate.getFullYear();
        const mm = startDate.getMonth();
        const dd = startDate.getDate();
        const date = new Date(
          yyyy,
          mm,
          dd,
          course.reference.toDate().getHours(),
          course.reference.toDate().getMinutes()
        );
        classes.push({
          date: date,
          capacity: course.capacity,
          name: `${yyyy}年${mm + 1}月${dd}日`,
          type: course.name,
          id: keyGen()
        });
      });
    }

    startDate.setDate(startDate.getDate() + 1);
  }

  return classes;
};
