export const getSession = (startDate, endDate, regularCourses) => {
  const classes = [];

  while (startDate.valueOf() !== endDate.valueOf()) {
    const day = startDate.getDay();
    const match = regularCourses.filter((course) => {
      return course.dayNum === day;
    });

    if (match.length) {
      match.forEach((course) => {
        const d = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          course.reference.toDate().getHours(),
          course.reference.toDate().getMinutes()
        );
        classes.push({
          date: d,
          capacity: course.capacity,
          name: course.name
        });
      });
    }

    startDate.setDate(startDate.getDate() + 1);
  }

  return classes;
};
