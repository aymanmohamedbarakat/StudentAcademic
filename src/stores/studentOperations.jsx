export const createStudentOperations = (set, get) => ({
  addStudent: (levelId, groupId, studentData) => {
    const { levels } = get();
    const newStudent = {
      id: Date.now().toString(),
      ...studentData,
      groupId: groupId.toString(),
      grades: [],
      attendance: [],
    };
    set({
      levels: levels.map((level) =>
        level.id === levelId
          ? {
              ...level,
              group: level.group.map((group) =>
                group.id === groupId
                  ? { ...group, students: [...group.students, newStudent] }
                  : group
              ),
            }
          : level
      ),
    });
  },

  removeStudent: (levelId, groupId, studentId) => {
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
                      students: group.students.filter(
                        (student) => student.id !== studentId
                      ),
                    }
                  : group
              ),
            }
          : level
      ),
    });
  },

  updateStudent: (levelId, groupId, studentId, studentData) => {
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
                          ? { ...student, ...studentData }
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
