export const markSelectionOnClasses = (selections = [], classes = []) => {
  if (classes.length === 0) {
    return [];
  }
  if (selections.length === 0) {
    return classes;
  }

  return classes.map((classProfile) => {
    if (selections.indexOf(classProfile.id) > -1) {
      return {
        ...classProfile,
        selected: true
      };
    } else {
      return {
        ...classProfile,
        selected: false
      };
    }
  });
};

export const hasStudent = (students, targetId) => {
  for (let student of students) {
    if (student.id === targetId) {
      return true;
    }
  }
  return false;
};
