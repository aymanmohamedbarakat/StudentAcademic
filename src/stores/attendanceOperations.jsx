export const createAttendanceOperations = (set, get) => ({
  addAttendance: (levelId, groupId, studentId, attendanceData) => {
    const { levels } = get();
    const newAttendance = {
      id: Date.now().toString(),
      ...attendanceData,
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
                              attendance: [
                                ...student.attendance,
                                newAttendance,
                              ],
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

  removeAttendance: (levelId, groupId, studentId, attendanceId) => {
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
                              attendance: student.attendance.filter(
                                (attendance) => attendance.id !== attendanceId
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

  updateAttendance: (
    levelId,
    groupId,
    studentId,
    attendanceId,
    attendanceData
  ) => {
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
                              attendance: student.attendance.map((attendance) =>
                                attendance.id === attendanceId
                                  ? { ...attendance, ...attendanceData }
                                  : attendance
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
