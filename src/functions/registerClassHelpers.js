function mapClasses(sessionClasses, allClasses) {
  let searchIndex = 0;
  const pending = {};
  return sessionClasses.map((sessionClass) => {
    if (pending[sessionClass.id]) {
      return {
        ...pending[sessionClass.id],
        selected: false
      };
    } else {
      for (let i = searchIndex; i < allClasses.length; i++) {
        if (allClasses[i].id === sessionClass.id) {
          return {
            ...allClasses[i],
            selected: false
          };
        } else {
          pending[allClasses[i].id] = allClasses[i];
          searchIndex += 1;
        }
      }
    }
  });
}

export const reconstruct = (session, classes) => {
  if (Object.keys(session).length === 0 || classes.length === 0) {
    return {};
  }

  const mappedClasses = mapClasses(session.classes, classes);
  const mappedSpan = session.span.map((span, i) => {
    const [monthStr, yearStr] = span.split('/');
    const month = parseInt(monthStr, 10) - 1;
    const year = parseInt(yearStr, 10);
    if (i === 1) {
      return new Date(year, month + 1, 0);
    }
    return new Date(year, month);
  });

  return {
    ...session,
    classes: mappedClasses,
    span: mappedSpan
  };
};

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
