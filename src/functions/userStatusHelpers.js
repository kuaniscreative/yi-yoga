export const getUserClasses = (uid, key, classes) => {
  return classes.filter((classInfo) => {
    for (let student of classInfo[key]) {
      if (student.id === uid) {
        return true;
      }
    }
    return false;
  });
};
