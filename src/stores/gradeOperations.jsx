export const createGradeOperations = (set, get) => ({
  addGrade: (levelId, groupId, studentId, gradeData) => {
    const { levels } = get();
    const newGrade = {
      id: Date.now().toString(),
      ...gradeData,
      studentId: studentId.toString(),
      levelId: levelId.toString(),
      groupId: groupId.toString(),
    };
    set({
      levels: levels.map((level) =>
        level.id === levelId
          ? {
              ...level,
              group: level.group.map((group) =>
                group.id === groupId
                  ? {
                      ...group,
                      students: group.students.map((student) =>
                        student.id === studentId
                          ? {
                              ...student,
                              grades: [...student.grades, newGrade],
                            }
                          : student
                      ),
                    }
                  : group
              ),
            }
          : level
      ),
    });
  },

  removeGrade: (levelId, groupId, studentId, gradeId) => {
    const { levels } = get();
    set({
      levels: levels.map((level) =>
        level.id === levelId
          ? {
              ...level,
              group: level.group.map((group) =>
                group.id === groupId
                  ? {
                      ...group,
                      students: group.students.map((student) =>
                        student.id === studentId
                          ? {
                              ...student,
                              grades: student.grades.filter(
                                (grade) => grade.id !== gradeId
                              ),
                            }
                          : student
                      ),
                    }
                  : group
              ),
            }
          : level
      ),
    });
  },

  updateGrade: (levelId, groupId, studentId, gradeId, gradeData) => {
    const { levels } = get();
    set({
      levels: levels.map((level) =>
        level.id === levelId
          ? {
              ...level,
              group: level.group.map((group) =>
                group.id === groupId
                  ? {
                      ...group,
                      students: group.students.map((student) =>
                        student.id === studentId
                          ? {
                              ...student,
                              grades: student.grades.map((grade) =>
                                grade.id === gradeId
                                  ? { ...grade, ...gradeData }
                                  : grade
                              ),
                            }
                          : student
                      ),
                    }
                  : group
              ),
            }
          : level
      ),
    });
  },
});
